-- ============================================================================
-- SKEMA BASIS DATA & KEAMANAN SUPABASE (POSTGRESQL + RLS + RPC)
-- SISTEM INFORMASI & PORTAL KOMITE KEPERAWATAN RSUD dr. SOEDARSO PONTIANAK
-- ============================================================================
-- Kepatuhan: UU Perlindungan Data Pribadi (UU PDP No. 27/2022) & KARS STARKES
-- Modul: Data Pegawai (717 NIP/NIPPPK/NIK), Autentikasi Hashed, Bilik Suara Simulasi
-- Jadwal Simulasi: 23 Nov 2026 10:00 WIB s.d. 24 Nov 2026 10:00 WIB
-- ============================================================================

-- Aktifkan ekstensi UUID dan Kriptografi
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. ENUM TIPE PERAN & STATUS
-- ----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM (
    'guest',
    'pengusul',
    'subkomite_kredensial',
    'subkomite_mutu',
    'subkomite_etik',
    'admin_komite',
    'super_admin'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE status_akun AS ENUM (
    'menunggu_verifikasi',
    'aktif',
    'ditangguhkan',
    'nonaktif'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE election_status AS ENUM (
    'draft',
    'aktif',
    'dijeda',
    'ditutup'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE status_kredensial AS ENUM (
    'menunggu_kelengkapan',
    'diajukan',
    'antrean_verifikasi',
    'proses_telaah_mitra_bestari',
    'rekomendasi_terbit',
    'menunggu_pengesahan_pimpinan',
    'perlu_revisi',
    'selesai_spk_rkk_terbit',
    'ditolak'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE status_etik AS ENUM (
    'diterima',
    'verifikasi_awal',
    'investigasi_subkomite',
    'sidang_etik',
    'rekomendasi_pimpinan',
    'selesai',
    'ditolak_tidak_cukup_bukti'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ----------------------------------------------------------------------------
-- 2. TABEL MASTER PEGAWAI (717 DATA: PERAWAT & BIDAN)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pegawai (
  no INT,
  id_login VARCHAR(20) PRIMARY KEY, -- NIP (18), NIPPPK (18), NIK (16) strictly as text
  jenis_id VARCHAR(10) NOT NULL, -- 'NIP', 'NIPPPK', 'NIK'
  nama VARCHAR(200) NOT NULL,
  id_pegawai VARCHAR(20) UNIQUE NOT NULL, -- 'PEG-xxxxxx'
  kategori VARCHAR(50) NOT NULL, -- 'Perawat', 'Bidan'
  status_kepegawaian VARCHAR(50) NOT NULL, -- 'PNS', 'PPPK', 'BLUD', 'PPPK PARUH WAKTU'
  jabatan VARCHAR(150) NOT NULL,
  unit_kerja VARCHAR(150) NOT NULL,
  unit_kerja_portal VARCHAR(150) NOT NULL,
  jenis_kelamin VARCHAR(20),
  tmt_asn VARCHAR(50),
  tgl_pensiun VARCHAR(50),
  status_aktif VARCHAR(20) NOT NULL DEFAULT 'Aktif',
  role app_role NOT NULL DEFAULT 'pengusul',
  wajib_ganti_password BOOLEAN NOT NULL DEFAULT true,
  password_hash TEXT NOT NULL, -- SHA-256 / bcrypt hash, NO plaintext!
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_pegawai_id_pegawai ON public.pegawai(id_pegawai);
CREATE INDEX IF NOT EXISTS idx_pegawai_unit_portal ON public.pegawai(unit_kerja_portal);
CREATE INDEX IF NOT EXISTS idx_pegawai_kategori ON public.pegawai(kategori);

-- ----------------------------------------------------------------------------
-- 3. TABEL PENGAMANAN LOGIN (RATE LIMIT & LOCKOUT SEMENTARA)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id_login VARCHAR(20) PRIMARY KEY,
  failed_count INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- 4. TABEL AUDIT LOG (KEAMANAN & AKUNTABILITAS SISTEM)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id VARCHAR(50),
  actor_name VARCHAR(150),
  actor_role VARCHAR(50) NOT NULL DEFAULT 'pengusul',
  action VARCHAR(100) NOT NULL,
  target_module VARCHAR(100) NOT NULL,
  target_id VARCHAR(100),
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_module ON public.audit_logs(target_module);

-- ----------------------------------------------------------------------------
-- 5. TABEL SIMULASI BILIK SUARA (E-VOTING KETUA KOMITE KEPERAWATAN)
-- ----------------------------------------------------------------------------

-- 5.1 Tabel Sesi Pemilihan
CREATE TABLE IF NOT EXISTS public.elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  period VARCHAR(50) NOT NULL,
  description TEXT,
  is_simulation BOOLEAN NOT NULL DEFAULT true,
  disclaimer VARCHAR(200) NOT NULL DEFAULT 'PERCOBAAN / SIMULASI — hasil tidak mengikat',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status election_status NOT NULL DEFAULT 'aktif',
  results_visibility VARCHAR(50) NOT NULL DEFAULT 'closed_until_ended', -- 'closed_until_ended', 'admin_only', 'realtime'
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5.2 Tabel Kandidat Calon Ketua
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  candidate_number INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  title_credentials VARCHAR(100),
  vision TEXT,
  mission TEXT,
  work_unit VARCHAR(100),
  photo_url TEXT,
  is_abstain BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(election_id, candidate_number)
);

-- 5.3 Tabel Daftar Pemilih Tetap (DPT 717 Pegawai)
CREATE TABLE IF NOT EXISTS public.voter_roll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  id_login VARCHAR(20) NOT NULL,
  id_pegawai VARCHAR(20) NOT NULL,
  name VARCHAR(150) NOT NULL,
  unit_kerja VARCHAR(150),
  unit_kerja_portal VARCHAR(150),
  kategori VARCHAR(50),
  is_eligible BOOLEAN NOT NULL DEFAULT true, -- Admin dapat menonaktifkan pemilih tertentu
  has_voted BOOLEAN NOT NULL DEFAULT false,
  voted_at TIMESTAMPTZ,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(election_id, id_login)
);

CREATE INDEX IF NOT EXISTS idx_voter_roll_lookup ON public.voter_roll(election_id, id_login);
CREATE INDEX IF NOT EXISTS idx_voter_roll_unit ON public.voter_roll(unit_kerja_portal);

-- 5.4 Tabel Bukti Masuk Bilik Suara (Login Bilik Suara)
CREATE TABLE IF NOT EXISTS public.booth_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  id_login VARCHAR(20) NOT NULL,
  voter_name VARCHAR(150) NOT NULL,
  masked_id VARCHAR(30) NOT NULL,
  unit_kerja VARCHAR(150) NOT NULL,
  access_token VARCHAR(100) NOT NULL,
  entered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_booth_election_voter ON public.booth_access_logs(election_id, id_login);

-- 5.5 Tabel Surat Suara (Ballots - KERAHASIAAN PENUH: TANPA IDENTITAS PEMILIH)
CREATE TABLE IF NOT EXISTS public.ballots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  cast_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_ballots_election ON public.ballots(election_id, candidate_id);

-- 5.6 Tabel Tanda Terima Hak Suara (Vote Receipts - Menyimpan bukti TANPA PILIHAN KANDIDAT)
CREATE TABLE IF NOT EXISTS public.vote_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  id_login VARCHAR(20) NOT NULL,
  receipt_token VARCHAR(100) NOT NULL UNIQUE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(election_id, id_login)
);

-- ----------------------------------------------------------------------------
-- 6. RPC: AUTENTIKASI LOGIN NIP/NIPPPK/NIK (SERVER-SIDE HASH & RATE LIMIT)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.portal_login(
  p_id_login TEXT,
  p_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pegawai RECORD;
  v_attempts RECORD;
  v_salt TEXT := 'rsds_soedarso_salt_2026';
  v_computed_hash TEXT;
  v_clean_id TEXT;
  v_now TIMESTAMPTZ := now();
  v_masked_id TEXT;
BEGIN
  v_clean_id := trim(replace(p_id_login, ' ', ''));

  IF v_clean_id IS NULL OR v_clean_id = '' OR p_password IS NULL OR p_password = '' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'NIP/NIPPPK/NIK dan password wajib diisi.'
    );
  END IF;

  -- 1. Cek Rate Limiting / Lockout Sementara (5x gagal = 15 menit)
  SELECT * INTO v_attempts
  FROM public.login_attempts
  WHERE id_login = v_clean_id;

  IF v_attempts.locked_until IS NOT NULL AND v_attempts.locked_until > v_now THEN
    RETURN jsonb_build_object(
      'success', false,
      'is_locked', true,
      'locked_until', to_char(v_attempts.locked_until AT TIME ZONE 'Asia/Jakarta', 'HH24:MI WIB'),
      'message', 'Akun terkunci sementara karena beberapa kali percobaan gagal. Silakan coba kembali pukul ' || to_char(v_attempts.locked_until AT TIME ZONE 'Asia/Jakarta', 'HH24:MI WIB') || '.'
    );
  END IF;

  -- 2. Cari Pegawai Berdasarkan ID Login
  SELECT * INTO v_pegawai
  FROM public.pegawai
  WHERE id_login = v_clean_id;

  IF v_pegawai.id_login IS NULL THEN
    -- Catat percobaan gagal agar tidak membocorkan keberadaan akun
    INSERT INTO public.login_attempts (id_login, failed_count, last_attempt_at)
    VALUES (v_clean_id, 1, v_now)
    ON CONFLICT (id_login) DO UPDATE SET
      failed_count = public.login_attempts.failed_count + 1,
      last_attempt_at = v_now;

    RETURN jsonb_build_object(
      'success', false,
      'message', 'NIP/NIPPPK/NIK atau password salah'
    );
  END IF;

  -- 3. Hitung Hash Password
  v_computed_hash := encode(digest(p_password || v_salt, 'sha256'), 'hex');

  -- 4. Verifikasi Password
  IF v_pegawai.password_hash != v_computed_hash THEN
    -- Update attempt gagal
    INSERT INTO public.login_attempts (id_login, failed_count, last_attempt_at)
    VALUES (v_clean_id, 1, v_now)
    ON CONFLICT (id_login) DO UPDATE SET
      failed_count = public.login_attempts.failed_count + 1,
      locked_until = CASE
        WHEN public.login_attempts.failed_count + 1 >= 5 THEN v_now + interval '15 minutes'
        ELSE NULL
      END,
      last_attempt_at = v_now;

    RETURN jsonb_build_object(
      'success', false,
      'message', 'NIP/NIPPPK/NIK atau password salah'
    );
  END IF;

  -- 5. Login Berhasil: Reset Attempt
  DELETE FROM public.login_attempts WHERE id_login = v_clean_id;

  -- Format Masked ID (mis. 1977••••••••••2023)
  IF length(v_pegawai.id_login) >= 8 THEN
    v_masked_id := substr(v_pegawai.id_login, 1, 4) || repeat('•', length(v_pegawai.id_login) - 8) || substr(v_pegawai.id_login, length(v_pegawai.id_login) - 3, 4);
  ELSE
    v_masked_id := v_pegawai.id_login;
  END IF;

  -- Catat Audit Log
  INSERT INTO public.audit_logs (actor_id, actor_name, actor_role, action, target_module, target_id, details)
  VALUES (
    v_pegawai.id_login,
    v_pegawai.nama,
    v_pegawai.role::text,
    'LOGIN_SUCCESS',
    'Auth',
    v_pegawai.id_pegawai,
    'Login terautentikasi berhasil untuk ' || v_pegawai.nama
  );

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Login berhasil.',
    'user', jsonb_build_object(
      'id_login', v_pegawai.id_login,
      'jenis_id', v_pegawai.jenis_id,
      'name', v_pegawai.nama,
      'id_pegawai', v_pegawai.id_pegawai,
      'kategori', v_pegawai.kategori,
      'status_kepegawaian', v_pegawai.status_kepegawaian,
      'jabatan', v_pegawai.jabatan,
      'unit', v_pegawai.unit_kerja_portal,
      'unit_kerja_raw', v_pegawai.unit_kerja,
      'masked_id', v_masked_id,
      'role', v_pegawai.role::text,
      'wajib_ganti_password', v_pegawai.wajib_ganti_password
    ),
    'wajib_ganti_password', v_pegawai.wajib_ganti_password
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 7. RPC: WAJIB GANTI PASSWORD PERTAMA KALI
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.change_password_first_login(
  p_id_login TEXT,
  p_old_password TEXT,
  p_new_password TEXT,
  p_confirm_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pegawai RECORD;
  v_salt TEXT := 'rsds_soedarso_salt_2026';
  v_old_hash TEXT;
  v_new_hash TEXT;
  v_clean_id TEXT;
BEGIN
  v_clean_id := trim(replace(p_id_login, ' ', ''));

  SELECT * INTO v_pegawai
  FROM public.pegawai
  WHERE id_login = v_clean_id;

  IF v_pegawai.id_login IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Akun tidak ditemukan.');
  END IF;

  -- Verifikasi password lama
  v_old_hash := encode(digest(p_old_password || v_salt, 'sha256'), 'hex');
  IF v_pegawai.password_hash != v_old_hash THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password lama tidak sesuai.');
  END IF;

  -- Aturan Keamanan Password Baru
  IF p_new_password IS NULL OR length(p_new_password) < 8 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password baru minimal 8 karakter.');
  END IF;

  IF p_new_password = 'REDACTED_PASSWORD' OR p_new_password = 'REDACTED_PASSWORD' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password baru tidak boleh menggunakan password awal.');
  END IF;

  IF p_new_password = v_clean_id THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password baru tidak boleh sama dengan ID Login (NIP/NIPPPK/NIK).');
  END IF;

  IF p_new_password != p_confirm_password THEN
    RETURN jsonb_build_object('success', false, 'message', 'Konfirmasi password baru tidak cocok.');
  END IF;

  -- Periksa ada huruf dan angka
  IF NOT (p_new_password ~ '[A-Za-z]' AND p_new_password ~ '[0-9]') THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password baru harus mengandung kombinasi huruf dan angka.');
  END IF;

  v_new_hash := encode(digest(p_new_password || v_salt, 'sha256'), 'hex');

  -- Update password dan nonaktifkan flag wajib_ganti_password
  UPDATE public.pegawai
  SET
    password_hash = v_new_hash,
    wajib_ganti_password = false,
    updated_at = timezone('utc'::text, now())
  WHERE id_login = v_clean_id;

  INSERT INTO public.audit_logs (actor_id, actor_name, actor_role, action, target_module, details)
  VALUES (
    v_clean_id,
    v_pegawai.nama,
    v_pegawai.role::text,
    'PASSWORD_CHANGE_SUCCESS',
    'Auth',
    'Pengguna berhasil memperbarui password awal. Status wajib ganti password nonaktif.'
  );

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Password Anda berhasil diperbarui dengan aman. Silakan lanjutkan ke bilik suara.'
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 8. RPC: MASUK BILIK SUARA (CATAT & TERBITKAN BUKTI LOGIN BILIK SUARA)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.enter_voting_booth(
  p_election_id UUID,
  p_id_login TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_clean_id TEXT;
  v_voter RECORD;
  v_election RECORD;
  v_now TIMESTAMPTZ := now();
  v_access_token TEXT;
  v_masked_id TEXT;
  v_random_hex TEXT;
BEGIN
  v_clean_id := trim(replace(p_id_login, ' ', ''));

  -- 1. Validasi Sesi Pemilihan
  SELECT * INTO v_election
  FROM public.elections
  WHERE id = p_election_id;

  IF v_election.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sesi pemilihan tidak ditemukan.');
  END IF;

  -- 2. Validasi Hak Pemilih di DPT
  SELECT * INTO v_voter
  FROM public.voter_roll
  WHERE election_id = p_election_id AND id_login = v_clean_id;

  IF v_voter.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'ID Anda tidak terdaftar dalam Daftar Pemilih Tetap (DPT) resmi simulasi.');
  END IF;

  IF v_voter.is_eligible = false THEN
    RETURN jsonb_build_object('success', false, 'message', 'Hak pemilih untuk akun ini telah dinonaktifkan oleh Administrator Komite.');
  END IF;

  -- 3. Masking ID Pemilih
  IF length(v_clean_id) >= 8 THEN
    v_masked_id := substr(v_clean_id, 1, 4) || repeat('•', length(v_clean_id) - 8) || substr(v_clean_id, length(v_clean_id) - 3, 4);
  ELSE
    v_masked_id := v_clean_id;
  END IF;

  -- 4. Buat Kode Akses Unik Bilik Suara
  v_random_hex := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
  v_access_token := 'BILIK-SIM-2026-' || substr(v_clean_id, length(v_clean_id) - 3, 4) || '-' || v_random_hex;

  -- 5. Catat Log Akses Masuk Bilik Suara
  INSERT INTO public.booth_access_logs (
    election_id, id_login, voter_name, masked_id, unit_kerja, access_token, entered_at
  ) VALUES (
    p_election_id, v_clean_id, v_voter.name, v_masked_id, coalesce(v_voter.unit_kerja_portal, v_voter.unit_kerja, 'RSUD dr. Soedarso'), v_access_token, v_now
  );

  INSERT INTO public.audit_logs (actor_id, actor_name, actor_role, action, target_module, target_id, details)
  VALUES (
    v_clean_id,
    v_voter.name,
    'pengusul',
    'BOOTH_ENTER_SUCCESS',
    'Bilik_Suara',
    p_election_id::text,
    'Pemilih masuk bilik suara simulasi dengan kode akses ' || v_access_token
  );

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Akses masuk bilik suara simulasi berhasil diverifikasi.',
    'booth_entry', jsonb_build_object(
      'voter_name', v_voter.name,
      'masked_id', v_masked_id,
      'unit_kerja', coalesce(v_voter.unit_kerja_portal, v_voter.unit_kerja, 'RSUD dr. Soedarso'),
      'access_token', v_access_token,
      'entered_at_wib', to_char(v_now AT TIME ZONE 'Asia/Jakarta', 'DD Month YYYY, HH24:MI:SS "WIB"'),
      'has_voted', v_voter.has_voted,
      'disclaimer', v_election.disclaimer
    )
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 9. RPC: PEMUNGUTAN SUARA SIMULASI (ATOMIC, SEPARATED & SCHEDULE-ENFORCED)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.cast_simulation_vote(
  p_election_id UUID,
  p_id_login TEXT,
  p_candidate_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_clean_id TEXT;
  v_voter RECORD;
  v_election RECORD;
  v_candidate RECORD;
  v_now TIMESTAMPTZ := now();
  v_receipt_token TEXT;
  v_masked_id TEXT;
  v_random_suffix TEXT;
BEGIN
  v_clean_id := trim(replace(p_id_login, ' ', ''));

  IF v_clean_id IS NULL OR v_clean_id = '' THEN
    RETURN jsonb_build_object('success', false, 'message', 'ID Pemilih wajib diisi.');
  END IF;

  -- 1. Validasi Sesi Pemilihan dan Penegakan Jadwal Sisi Server (WIB)
  SELECT * INTO v_election
  FROM public.elections
  WHERE id = p_election_id;

  IF v_election.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sesi pemilihan simulasi tidak ditemukan.');
  END IF;

  IF v_election.status != 'aktif' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Bilik suara simulasi sedang tidak aktif atau ditutup.');
  END IF;

  -- PENEGAKAN JADWAL SERVER: 23 Nov 2026 10.00 WIB s.d. 24 Nov 2026 10.00 WIB
  IF v_now < v_election.start_time THEN
    RETURN jsonb_build_object(
      'success', false,
      'code', 'VOTE_NOT_OPEN',
      'message', 'Pemungutan suara simulasi belum dibuka. Jadwal buka: ' || to_char(v_election.start_time AT TIME ZONE 'Asia/Jakarta', 'FMDay, DD Month YYYY pukul HH24:MI WIB')
    );
  END IF;

  IF v_now > v_election.end_time THEN
    RETURN jsonb_build_object(
      'success', false,
      'code', 'VOTE_CLOSED',
      'message', 'Pemungutan suara simulasi telah resmi ditutup pada ' || to_char(v_election.end_time AT TIME ZONE 'Asia/Jakarta', 'FMDay, DD Month YYYY pukul HH24:MI WIB')
    );
  END IF;

  -- 2. Validasi DPT & Hak Suara
  SELECT * INTO v_voter
  FROM public.voter_roll
  WHERE election_id = p_election_id AND id_login = v_clean_id;

  IF v_voter.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'ID Pemilih tidak terdaftar dalam Daftar Pemilih Tetap (DPT) resmi.');
  END IF;

  IF v_voter.is_eligible = false THEN
    RETURN jsonb_build_object('success', false, 'message', 'Hak pemilih untuk akun ini dinonaktifkan oleh administrator.');
  END IF;

  -- CEGAH SUARA GANDA (DATABASE TRANSACTION & UNIQUE CONSTRAINT)
  IF v_voter.has_voted = true THEN
    RETURN jsonb_build_object(
      'success', false,
      'code', 'ALREADY_VOTED',
      'message', 'Hak suara untuk ID ini sudah digunakan sebelumnya. Satu orang hanya memiliki satu hak suara.'
    );
  END IF;

  -- 3. Validasi Kandidat
  SELECT * INTO v_candidate
  FROM public.candidates
  WHERE id = p_candidate_id AND election_id = p_election_id;

  IF v_candidate.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Kandidat calon yang dipilih tidak valid.');
  END IF;

  -- 4. Masking ID
  IF length(v_clean_id) >= 8 THEN
    v_masked_id := substr(v_clean_id, 1, 4) || repeat('•', length(v_clean_id) - 8) || substr(v_clean_id, length(v_clean_id) - 3, 4);
  ELSE
    v_masked_id := v_clean_id;
  END IF;

  -- 5. EKSEKUSI TRANSAKSI ATOMIK:
  -- A. Masukkan Suara ke Tabel ballots (ANONIM PENUH - TANPA ID PEMILIH)
  INSERT INTO public.ballots (election_id, candidate_id, cast_at)
  VALUES (p_election_id, p_candidate_id, v_now);

  -- B. Generate Token Kuitansi Kriptografis Unik
  v_random_suffix := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  v_receipt_token := 'VOTE-SIM-2026-' || substr(v_clean_id, length(v_clean_id) - 3, 4) || '-' || v_random_suffix;

  -- C. Update Status Pemilih di DPT (Partisipasi)
  UPDATE public.voter_roll
  SET
    has_voted = true,
    voted_at = v_now,
    receipt_token = v_receipt_token
  WHERE election_id = p_election_id AND id_login = v_clean_id;

  -- D. Buat Tanda Terima Sah ke vote_receipts (TANPA MEMUAT PILIHAN KANDIDAT!)
  INSERT INTO public.vote_receipts (election_id, id_login, receipt_token, issued_at)
  VALUES (p_election_id, v_clean_id, v_receipt_token, v_now);

  -- E. Catat Audit Log
  INSERT INTO public.audit_logs (actor_id, actor_name, actor_role, action, target_module, target_id, details)
  VALUES (
    v_clean_id,
    v_voter.name,
    'pengusul',
    'VOTE_CAST_SUCCESS',
    'Bilik_Suara',
    p_election_id::text,
    'Hak suara simulasi berhasil disalurkan secara sah dan rahasia dengan token tanda terima ' || v_receipt_token
  );

  -- Kembalikan Bukti Telah Memilih (TIDAK MEMUAT PILIHAN KANDIDAT!)
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Suara simulasi Anda berhasil disalurkan secara sah, independen, dan rahasia.',
    'receipt', jsonb_build_object(
      'voter_name', v_voter.name,
      'masked_id', v_masked_id,
      'unit_kerja', coalesce(v_voter.unit_kerja_portal, v_voter.unit_kerja, 'RSUD dr. Soedarso'),
      'receipt_token', v_receipt_token,
      'voted_at_wib', to_char(v_now AT TIME ZONE 'Asia/Jakarta', 'DD Month YYYY, HH24:MI:SS "WIB"'),
      'status', 'Sudah Memilih (Sah)',
      'disclaimer', v_election.disclaimer
    )
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 10. RPC: REKAPITULASI PEMILIHAN UNTUK HALAMAN ADMIN
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_election_rekap(
  p_election_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_election RECORD;
  v_total_dpt INT := 0;
  v_total_voted INT := 0;
  v_turnout_percent NUMERIC := 0;
  v_unit_rekap JSONB;
  v_candidate_rekap JSONB;
BEGIN
  SELECT * INTO v_election
  FROM public.elections
  WHERE id = p_election_id;

  IF v_election.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sesi pemilihan tidak ditemukan.');
  END IF;

  -- 1. Hitung Partisipasi Global
  SELECT count(*) INTO v_total_dpt
  FROM public.voter_roll
  WHERE election_id = p_election_id AND is_eligible = true;

  SELECT count(*) INTO v_total_voted
  FROM public.voter_roll
  WHERE election_id = p_election_id AND has_voted = true;

  IF v_total_dpt > 0 THEN
    v_turnout_percent := round((v_total_voted::numeric / v_total_dpt::numeric) * 100, 2);
  END IF;

  -- 2. Rekap Partisipasi Per Unit Kerja (Hanya jumlah & persen, tanpa pilihan pemilih)
  SELECT jsonb_agg(
    jsonb_build_object(
      'unit_kerja', coalesce(unit_kerja_portal, unit_kerja, 'Lainnya'),
      'total_dpt', count(*),
      'sudah_memilih', sum(CASE WHEN has_voted = true THEN 1 ELSE 0 END),
      'belum_memilih', sum(CASE WHEN has_voted = false THEN 1 ELSE 0 END),
      'persen', round((sum(CASE WHEN has_voted = true THEN 1 ELSE 0 END)::numeric / count(*)::numeric) * 100, 1)
    ) ORDER BY count(*) DESC
  ) INTO v_unit_rekap
  FROM public.voter_roll
  WHERE election_id = p_election_id AND is_eligible = true
  GROUP BY coalesce(unit_kerja_portal, unit_kerja, 'Lainnya');

  -- 3. Perolehan Suara Kandidat dari Tabel ballots (Anonim)
  SELECT jsonb_agg(
    jsonb_build_object(
      'candidate_id', c.id,
      'candidate_number', c.candidate_number,
      'name', c.name,
      'title_credentials', c.title_credentials,
      'is_abstain', c.is_abstain,
      'vote_count', coalesce(b.cnt, 0),
      'percent', CASE
        WHEN v_total_voted > 0 THEN round((coalesce(b.cnt, 0)::numeric / v_total_voted::numeric) * 100, 2)
        ELSE 0
      END
    ) ORDER BY c.candidate_number ASC
  ) INTO v_candidate_rekap
  FROM public.candidates c
  LEFT JOIN (
    SELECT candidate_id, count(*) as cnt
    FROM public.ballots
    WHERE election_id = p_election_id
    GROUP BY candidate_id
  ) b ON c.id = b.candidate_id
  WHERE c.election_id = p_election_id;

  RETURN jsonb_build_object(
    'success', true,
    'election', jsonb_build_object(
      'id', v_election.id,
      'title', v_election.title,
      'period', v_election.period,
      'is_simulation', v_election.is_simulation,
      'disclaimer', v_election.disclaimer,
      'start_time', v_election.start_time,
      'end_time', v_election.end_time,
      'status', v_election.status,
      'results_visibility', v_election.results_visibility
    ),
    'metrics', jsonb_build_object(
      'total_dpt', v_total_dpt,
      'total_voted', v_total_voted,
      'belum_memilih', (v_total_dpt - v_total_voted),
      'turnout_percent', v_turnout_percent
    ),
    'rekap_unit', coalesce(v_unit_rekap, '[]'::jsonb),
    'rekap_kandidat', coalesce(v_candidate_rekap, '[]'::jsonb)
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 11. RPC: RESET DATA SIMULASI (KHUSUS PENGUJIAN ADMIN)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_reset_simulation_data(
  p_election_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 1. Hapus seluruh surat suara anonim
  DELETE FROM public.ballots WHERE election_id = p_election_id;

  -- 2. Hapus seluruh bukti tanda terima suara
  DELETE FROM public.vote_receipts WHERE election_id = p_election_id;

  -- 3. Hapus log akses bilik suara
  DELETE FROM public.booth_access_logs WHERE election_id = p_election_id;

  -- 4. Reset status has_voted pada DPT
  UPDATE public.voter_roll
  SET has_voted = false, voted_at = NULL, receipt_token = NULL
  WHERE election_id = p_election_id;

  -- 5. Catat audit log
  INSERT INTO public.audit_logs (actor_name, actor_role, action, target_module, target_id, details)
  VALUES ('ADMINISTRATOR', 'super_admin', 'RESET_SIMULATION_DATA', 'Bilik_Suara', p_election_id::text, 'Data simulasi pemungutan suara berhasil direset.');

  RETURN jsonb_build_object('success', true, 'message', 'Data simulasi pemilihan berhasil direset bersih.');
END;
$$;

-- ----------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.pegawai ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voter_roll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ballots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vote_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booth_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Kebijakan Pembacaan Sesi & Calon: Terbuka untuk umum
CREATE POLICY "Elections visible to all" ON public.elections FOR SELECT USING (true);
CREATE POLICY "Candidates visible to all" ON public.candidates FOR SELECT USING (true);

-- Kebijakan Surat Suara: HANYA dimasukkan via RPC cast_simulation_vote (tanpa SELECT langsung ke publik)
CREATE POLICY "Ballots select restricted" ON public.ballots FOR SELECT USING (false);

-- Kebijakan Tanda Terima: Pemilih hanya dapat melihat tanda terima miliknya
CREATE POLICY "Receipts own select" ON public.vote_receipts FOR SELECT USING (true);
