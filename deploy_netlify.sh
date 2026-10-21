#!/bin/bash
# ==============================================================================
# SCRIPT PENGEMASAN & DEPLOY NETLIFY
# Komite Keperawatan RSUD dr. Soedarso Pontianak
# Target Resmi Terkunci: https://regal-smakager-133704.netlify.app/
# ==============================================================================

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "=================================================================="
echo " [DEPLOY] Mengemas Aplikasi Komite Keperawatan RSUD dr. Soedarso..."
echo " Target URL Resmi: https://regal-smakager-133704.netlify.app/"
echo " Waktu: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=================================================================="

# 1. Pastikan _redirects dan _headers siap
echo "/* /index.html 200" > _redirects

# 2. Kemas paket zip produksi
echo "Mengemas seluruh berkas web ke dalam arsip zip..."
zip -r deploy_komite_netlify.zip index.html index.css app.js data.js logo_asset.js logo_kalbar.png logo_kalbar.svg logo_komite.png logo_komite_256.png hero_banner.jpg manifest.json netlify.toml _redirects _headers google_apps_script_surat_kredensial.js > /dev/null

# 3. Salin paket zip ke folder Downloads pengguna
cp deploy_komite_netlify.zip ~/Downloads/komite-keperawatan-soedarso-netlify.zip
cp deploy_komite_netlify.zip komite-keperawatan-soedarso-netlify.zip

echo "✅ Berkas zip siap deploy telah diperbarui:"
echo "   - ~/Downloads/komite-keperawatan-soedarso-netlify.zip"
echo "   - $DIR/komite-keperawatan-soedarso-netlify.zip"
echo ""
echo "🌐 URL Tetap & Terkunci: https://regal-smakager-133704.netlify.app/"
echo "Untuk memperbarui situs, cukup seret (drag & drop) berkas zip di atas"
echo "ke dashboard Netlify pada situs: regal-smakager-133704"
echo "=================================================================="
