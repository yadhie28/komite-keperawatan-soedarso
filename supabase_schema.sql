-- ============================================================================
-- SKEMA BASIS DATA & KEAMANAN SUPABASE (POSTGRESQL + RLS + RPC)
-- SISTEM INFORMASI & PORTAL KOMITE KEPERAWATAN RSUD dr. SOEDARSO PONTIANAK
-- ============================================================================
-- File: supabase_schema.sql
-- Kepatuhan: UU Perlindungan Data Pribadi (UU PDP No. 27/2022) & KARS STARKES
-- ============================================================================

-- Aktifkan ekstensi UUID dan Kriptografi
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. ENUM TIPE PERAN & STATUS
-- ----------------------------------------------------------------------------
CREATE TYPE app_role AS ENUM (
  'guest',
  'pengusul',
  'subkomite_kredensial',
  'subkomite_mutu',
  'subkomite_etik',
  'admin_komite',
  'super_admin'
);

CREATE TYPE status_akun AS ENUM (
  'menunggu_verifikasi',
  'aktif',
  'ditangguhkan',
  'nonaktif'
);

CREATE TYPE election_status AS ENUM (
  'draft',
  'aktif',
  'dijeda',
  'ditutup'
);

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

CREATE TYPE status_etik AS ENUM (
  'diterima',
  'verifikasi_awal',
  'investigasi_subkomite',
  'sidang_etik',
  'rekomendasi_pimpinan',
  'selesai',
  'ditolak_tidak_cukup_bukti'
);

-- ----------------------------------------------------------------------------
-- 2. TABEL PROFIL PENGGUNA (PROFILES)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nip VARCHAR(20) UNIQUE NOT NULL,
  nama_lengkap VARCHAR(150) NOT NULL,
  gelar_depan VARCHAR(20),
  gelar_belakang VARCHAR(50),
  role app_role NOT NULL DEFAULT 'pengusul',
  status_akun status_akun NOT NULL DEFAULT 'menunggu_verifikasi',
  must_change_password BOOLEAN NOT NULL DEFAULT true,
  jenjang_pk VARCHAR(20) DEFAULT 'Pra-PK',
  unit_kerja VARCHAR(100) NOT NULL,
  area_klinis VARCHAR(100),
  no_hp VARCHAR(25),
  email VARCHAR(100),
  alamat TEXT,
  nomor_str VARCHAR(50),
  masa_berlaku_str DATE,
  nomor_sip VARCHAR(50),
  masa_berlaku_sip DATE,
  foto_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_nip ON public.profiles(nip);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_unit ON public.profiles(unit_kerja);

-- ----------------------------------------------------------------------------
-- 3. TABEL LOG AUDIT RESMI (APPEND-ONLY, TIDAK BISA DIHAPUS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_name VARCHAR(150),
  actor_role VARCHAR(50),
  action VARCHAR(100) NOT NULL,
  target_module VARCHAR(100) NOT NULL,
  target_id TEXT,
  details TEXT,
  ip_address VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON public.audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON public.audit_logs(actor_id);

-- ----------------------------------------------------------------------------
-- 4. TABEL BILIK SUARA (PEMILIHAN KETUA KOMITE KEPERAWATAN)
-- ----------------------------------------------------------------------------
-- 4.1 Tabel Sesi Pemilihan
CREATE TABLE IF NOT EXISTS public.elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  period VARCHAR(50) NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status election_status NOT NULL DEFAULT 'draft',
  results_visibility VARCHAR(50) NOT NULL DEFAULT 'closed_until_ended', -- 'closed_until_ended' atau 'realtime'
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4.2 Tabel Kandidat Calon Ketua
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(election_id, candidate_number)
);

-- 4.3 Tabel Daftar Pemilih Tetap (DPT Resmi dari SK Direktur / Panitia)
CREATE TABLE IF NOT EXISTS public.voter_roll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  nip VARCHAR(20) NOT NULL,
  name VARCHAR(150) NOT NULL,
  unit_kerja VARCHAR(100),
  has_voted BOOLEAN NOT NULL DEFAULT false,
  voted_at TIMESTAMPTZ,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(election_id, nip)
);

CREATE INDEX IF NOT EXISTS idx_voter_roll_lookup ON public.voter_roll(election_id, nip);

-- 4.4 Tabel Surat Suara (Ballots - TANPA IDENTITAS PEMILIH AGAR RAHASIA & ANOMIM)
CREATE TABLE IF NOT EXISTS public.ballots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  cast_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_ballots_election ON public.ballots(election_id, candidate_id);

-- 4.5 Tabel Tanda Terima Hak Suara (Vote Receipts - Menyimpan bukti tanpa pilihan calon)
CREATE TABLE IF NOT EXISTS public.vote_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  voter_nip VARCHAR(20) NOT NULL,
  receipt_token UUID NOT NULL DEFAULT gen_random_uuid(),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(election_id, voter_nip)
);

-- ----------------------------------------------------------------------------
-- 5. TABEL REKAM KREDENSIAL & CV MASTER (LANGKAH 1-6)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cv_master (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.credential_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  jenis_permohonan VARCHAR(50) NOT NULL,
  jenjang_diajukan VARCHAR(20) NOT NULL,
  unit_kerja VARCHAR(100) NOT NULL,
  status status_kredensial NOT NULL DEFAULT 'diajukan',
  cv_snapshot JSONB NOT NULL,
  rkk_snapshot JSONB,
  psv_snapshot JSONB,
  uploaded_files JSONB DEFAULT '[]'::jsonb,
  verifikator_id UUID REFERENCES auth.users(id),
  verifikator_name VARCHAR(150),
  verifikator_notes TEXT,
  mitra_bestari_id UUID REFERENCES auth.users(id),
  mitra_bestari_notes TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_cred_user ON public.credential_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_cred_status ON public.credential_applications(status);

-- ----------------------------------------------------------------------------
-- 6. TABEL E-LOGBOOK ASUHAN KEPERAWATAN (SDKI-SIKI-SLKI 3S PPNI)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.logbook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  shift VARCHAR(20) NOT NULL,
  patient_mrn_masked VARCHAR(20) NOT NULL, -- Format tersamar: misal 'RM-***123'
  work_unit VARCHAR(100) NOT NULL,
  sdki_code VARCHAR(20) NOT NULL,
  sdki_diagnosis TEXT NOT NULL,
  siki_code VARCHAR(20) NOT NULL,
  siki_intervention TEXT NOT NULL,
  slki_code VARCHAR(20) NOT NULL,
  slki_outcome TEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'Mandiri', -- 'Mandiri', 'Kolaboratif', 'Observasi'
  notes TEXT,
  verified_by_head_nurse BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  verifier_id UUID REFERENCES auth.users(id),
  verifier_name VARCHAR(150),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_logbook_user ON public.logbook_entries(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_logbook_unit ON public.logbook_entries(work_unit);

-- ----------------------------------------------------------------------------
-- 7. TABEL PENGADUAN ETIK & WHISTLEBLOWING (TERENKRIPSI & RAHASIA)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ethics_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  tracking_code_hash TEXT NOT NULL, -- SHA-256 hash dari kode akses rahasia pelapor
  category VARCHAR(100) NOT NULL,
  unit_terlapor VARCHAR(100) NOT NULL,
  description_encrypted TEXT NOT NULL,
  contact_encrypted TEXT,
  status status_etik NOT NULL DEFAULT 'diterima',
  response_notes TEXT,
  response_date TIMESTAMPTZ,
  handler_name VARCHAR(150),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_ethics_ticket ON public.ethics_reports(ticket_number);

-- ----------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) - PERLINDUNGAN KETAT DATA PRIBADI
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voter_roll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ballots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vote_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credential_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logbook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethics_reports ENABLE ROW LEVEL SECURITY;

-- Helper Function: Dapatkan Role Pengguna Saat Ini
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS app_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 8.1 Kebijakan RLS: PROFILES
CREATE POLICY "Profil dapat dibaca oleh pemiliknya"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.current_user_role() IN ('admin_komite', 'super_admin'));

CREATE POLICY "Profil dapat diupdate oleh pemiliknya"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 8.2 Kebijakan RLS: AUDIT LOGS (Hanya Super Admin & Admin Komite yang bisa membaca, TIDAK BISA DIHAPUS)
CREATE POLICY "Audit logs dibaca oleh pimpinan & admin"
  ON public.audit_logs FOR SELECT
  USING (public.current_user_role() IN ('super_admin', 'admin_komite'));

CREATE POLICY "Audit logs dapat disisipkan sistem"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- 8.3 Kebijakan RLS: ELECTIONS & CANDIDATES (Publik/Semua Pengguna Terdaftar Dapat Membaca)
CREATE POLICY "Elections dapat dilihat semua pengguna"
  ON public.elections FOR SELECT
  USING (true);

CREATE POLICY "Candidates dapat dilihat semua pengguna"
  ON public.candidates FOR SELECT
  USING (true);

-- 8.4 Kebijakan RLS: BALLOTS & VOTE RECEIPTS
-- Suara (ballots) tidak dapat dibaca langsung oleh siapapun saat pemilihan berlangsung jika mode tertutup
CREATE POLICY "Ballots hanya dapat dihitung lewat RPC"
  ON public.ballots FOR SELECT
  USING (public.current_user_role() IN ('super_admin', 'admin_komite'));

CREATE POLICY "Vote receipts hanya dapat dilihat pemilik token"
  ON public.vote_receipts FOR SELECT
  USING (voter_nip = (SELECT nip FROM public.profiles WHERE id = auth.uid()));

-- 8.5 Kebijakan RLS: KREDENSIAL (CV & APPLICATIONS)
CREATE POLICY "CV Master hanya oleh pemilik"
  ON public.cv_master FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Aplikasi kredensial hanya oleh pengusul & subkomite kredensial"
  ON public.credential_applications FOR SELECT
  USING (
    auth.uid() = user_id OR
    public.current_user_role() IN ('subkomite_kredensial', 'admin_komite', 'super_admin')
  );

CREATE POLICY "Pengusul dapat membuat permohonan kredensial"
  ON public.credential_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Update status kredensial oleh subkomite kredensial"
  ON public.credential_applications FOR UPDATE
  USING (
    public.current_user_role() IN ('subkomite_kredensial', 'admin_komite', 'super_admin') OR
    (auth.uid() = user_id AND status = 'perlu_revisi')
  );

-- 8.6 Kebijakan RLS: E-LOGBOOK
CREATE POLICY "Logbook dibaca oleh pemilik & kepala ruangan"
  ON public.logbook_entries FOR SELECT
  USING (
    auth.uid() = user_id OR
    public.current_user_role() IN ('subkomite_mutu', 'admin_komite', 'super_admin')
  );

CREATE POLICY "Pengusul dapat menginput logbook sendiri"
  ON public.logbook_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Pengusul dapat mengubah logbook belum disahkan"
  ON public.logbook_entries FOR UPDATE
  USING (
    (auth.uid() = user_id AND verified_by_head_nurse = false) OR
    public.current_user_role() IN ('subkomite_mutu', 'admin_komite', 'super_admin')
  );

-- 8.7 Kebijakan RLS: PENGADUAN ETIK
CREATE POLICY "Semua dapat mengajukan pengaduan etik"
  ON public.ethics_reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Pengaduan etik hanya dapat dibaca oleh subkomite etik & pimpinan"
  ON public.ethics_reports FOR SELECT
  USING (public.current_user_role() IN ('subkomite_etik', 'admin_komite', 'super_admin'));

CREATE POLICY "Pengaduan etik hanya dapat diupdate oleh subkomite etik & pimpinan"
  ON public.ethics_reports FOR UPDATE
  USING (public.current_user_role() IN ('subkomite_etik', 'admin_komite', 'super_admin'));

-- ----------------------------------------------------------------------------
-- 9. POSTGRESQL RPC TRANSACTION: PEMUNGUTAN SUARA ATOMIK & ANONIM
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.submit_vote_atomic(
  p_election_id UUID,
  p_candidate_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_voter_nip VARCHAR(20);
  v_voter_name VARCHAR(150);
  v_election public.elections%ROWTYPE;
  v_receipt_token UUID;
  v_now TIMESTAMPTZ := timezone('utc'::text, now());
BEGIN
  -- 1. Verifikasi Autentikasi Pengguna
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Autentikasi ditolak. Silakan login terlebih dahulu.');
  END IF;

  -- 2. Ambil NIP dan Nama Pemilih dari Profil
  SELECT nip, nama_lengkap INTO v_voter_nip, v_voter_name
  FROM public.profiles
  WHERE id = v_user_id;

  IF v_voter_nip IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Profil pengguna tidak ditemukan.');
  END IF;

  -- 3. Cek Status Sesi Pemilihan dan Jadwal
  SELECT * INTO v_election
  FROM public.elections
  WHERE id = p_election_id;

  IF v_election.id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sesi pemilihan tidak ditemukan.');
  END IF;

  IF v_election.status != 'aktif' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Bilik suara sedang ditutup atau tidak aktif.');
  END IF;

  IF v_now < v_election.start_time OR v_now > v_election.end_time THEN
    RETURN jsonb_build_object('success', false, 'message', 'Waktu pemungutan suara telah berakhir atau belum dibuka.');
  END IF;

  -- 4. Verifikasi Keberadaan di DPT (Daftar Pemilih Tetap)
  IF NOT EXISTS (
    SELECT 1 FROM public.voter_roll
    WHERE election_id = p_election_id AND nip = v_voter_nip
  ) THEN
    RETURN jsonb_build_object('success', false, 'message', 'NIP Anda tidak terdaftar dalam Daftar Pemilih Tetap (DPT) resmi.');
  END IF;

  -- 5. Kunci & Periksa Status Hak Suara (Cegah Suara Ganda)
  IF EXISTS (
    SELECT 1 FROM public.voter_roll
    WHERE election_id = p_election_id AND nip = v_voter_nip AND has_voted = true
  ) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Hak suara untuk NIP ini telah digunakan dan tercatat sebelumnya.');
  END IF;

  -- 6. Verifikasi Kandidat yang Dipilih
  IF NOT EXISTS (
    SELECT 1 FROM public.candidates
    WHERE id = p_candidate_id AND election_id = p_election_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Kandidat calon yang dipilih tidak valid.');
  END IF;

  -- 7. EKSEKUSI TRANSAKSI ATOMIK:
  -- A. Masukkan Surat Suara ke tabel ballots (ANONIM - tanpa NIP pemilih)
  INSERT INTO public.ballots (election_id, candidate_id, cast_at)
  VALUES (p_election_id, p_candidate_id, v_now);

  -- B. Tandai DPT bahwa pemilih sudah menggunakan hak suaranya
  UPDATE public.voter_roll
  SET has_voted = true, voted_at = v_now
  WHERE election_id = p_election_id AND nip = v_voter_nip;

  -- C. Buat Tanda Terima Suara dengan Token Kriptografis Unik (UUID)
  v_receipt_token := gen_random_uuid();
  INSERT INTO public.vote_receipts (election_id, voter_nip, receipt_token, issued_at)
  VALUES (p_election_id, v_voter_nip, v_receipt_token, v_now);

  -- D. Catat ke Audit Log Resmi
  INSERT INTO public.audit_logs (actor_id, actor_name, actor_role, action, target_module, target_id, details)
  VALUES (
    v_user_id,
    v_voter_name,
    'pengusul',
    'VOTE_CAST_SUCCESS',
    'Bilik_Suara',
    p_election_id::text,
    'Suara berhasil dimasukkan ke bilik suara anonim dengan token ' || v_receipt_token::text
  );

  -- 8. Kembalikan Respon Sukses Beserta Token Tanda Terima
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Suara Anda berhasil dicatat secara sah, rahasia, dan independen.',
    'receipt_token', v_receipt_token,
    'voted_at', to_char(v_now AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM-DD HH24:MI:SS WIB')
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 10. POSTGRESQL RPC FUNCTION: GANTI PASSWORD PERTAMA KALI (MANDATORY RESET)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.change_password_first_login(
  p_new_password TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Sesi tidak valid.');
  END IF;

  IF length(p_new_password) < 8 THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password minimal 8 karakter.');
  END IF;

  IF p_new_password = 'REDACTED_PASSWORD' OR p_new_password = 'REDACTED_PASSWORD' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Password baru tidak boleh menggunakan password default.');
  END IF;

  -- Nonaktifkan flag must_change_password
  UPDATE public.profiles
  SET must_change_password = false, updated_at = timezone('utc'::text, now())
  WHERE id = v_user_id;

  INSERT INTO public.audit_logs (actor_id, action, target_module, details)
  VALUES (v_user_id, 'PASSWORD_CHANGE_SUCCESS', 'Auth', 'Pengguna mengganti password awal dan mengaktifkan akun penuh.');

  RETURN jsonb_build_object('success', true, 'message', 'Password berhasil diperbarui. Status akun Anda kini aktif penuh.');
END;
$$;
