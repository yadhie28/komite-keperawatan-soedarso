#!/usr/bin/env bash
# =============================================================================
# cek-kebocoran.sh — Deteksi kebocoran NIP/NIK di repository
# Keluar dengan kode 1 jika ditemukan NIP/NIK asli di file yang ter-track.
# =============================================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPO_ROOT"

FOUND=0

echo -e "${YELLOW}[cek-kebocoran] Memindai NIP 18-digit dan NIK 16-digit...${NC}"

# Scan all non-.git files, excluding binary/image files
while IFS= read -r file; do
  # Skip binary / image / font files
  case "$file" in
    *.png|*.jpg|*.jpeg|*.gif|*.ico|*.svg|*.woff|*.woff2|*.ttf|*.eot|*.zip|*.pdf) continue ;;
  esac

  # --- NIP 18-digit: 8 digits, space-or-not, 6 digits, space-or-not, 1 digit, space-or-not, 3 digits ---
  # Grep for patterns like 00000000 000000 1 036 or 00000000 000000 1 036
  if grep -Pn '\d{8}\s?\d{6}\s?\d\s?\d{3}' "$file" 2>/dev/null | while IFS= read -r match; do
    # Extract the raw digits (strip spaces)
    nip_raw=$(echo "$match" | grep -Po '\d{8}\s?\d{6}\s?\d\s?\d{3}' | head -1 | tr -d ' ')

    # Allowlist: director's NIP (000000000000000000 → 196905201998031008)
    if [ "$nip_raw" = "196905201998031008" ]; then
      continue
    fi
    # Allowlist: fake/placeholder NIPs starting with 00000000
    if [[ "$nip_raw" == 00000000* ]]; then
      continue
    fi

    echo -e "${RED}[BOCOR] NIP ditemukan di ${file}:${NC}"
    echo "  $match"
    FOUND=1
  done; then
    :
  fi

  # --- NIK 16-digit: exactly 16 consecutive digits (not part of a longer number) ---
  if grep -Pn '(?<!\d)\d{16}(?!\d)' "$file" 2>/dev/null | while IFS= read -r match; do
    echo -e "${RED}[BOCOR] NIK 16-digit ditemukan di ${file}:${NC}"
    echo "  $match"
    FOUND=1
  done; then
    :
  fi
done < <(git ls-files 2>/dev/null || find . -not -path './.git/*' -type f)

# Check the FOUND status via a second pass (subshell workaround)
LEAK_COUNT=0

while IFS= read -r file; do
  case "$file" in
    *.png|*.jpg|*.jpeg|*.gif|*.ico|*.svg|*.woff|*.woff2|*.ttf|*.eot|*.zip|*.pdf) continue ;;
  esac

  while IFS= read -r nip_raw; do
    nip_clean=$(echo "$nip_raw" | tr -d ' ')
    # Allowlist
    [ "$nip_clean" = "196905201998031008" ] && continue
    [[ "$nip_clean" == 00000000* ]] && continue
    LEAK_COUNT=$((LEAK_COUNT + 1))
  done < <(grep -Po '\d{8}\s?\d{6}\s?\d\s?\d{3}' "$file" 2>/dev/null || true)

  while IFS= read -r _; do
    LEAK_COUNT=$((LEAK_COUNT + 1))
  done < <(grep -Po '(?<!\d)\d{16}(?!\d)' "$file" 2>/dev/null || true)
done < <(git ls-files 2>/dev/null || find . -not -path './.git/*' -type f)

if [ "$LEAK_COUNT" -gt 0 ]; then
  echo ""
  echo -e "${RED}✗ Ditemukan $LEAK_COUNT kemungkinan kebocoran NIP/NIK!${NC}"
  echo -e "${RED}  Perbaiki sebelum commit.${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Tidak ditemukan kebocoran NIP/NIK. Aman.${NC}"
  exit 0
fi
