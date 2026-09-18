#!/usr/bin/env bash
# e2e.sh — the small-things corridor. every green is a witnessed mechanism.
set -uo pipefail
cd "$(dirname "$0")"

echo "== corridor: small-things.vaked.dev =="
fail=0

node selftest.mjs || fail=1

[ -f robots.txt ] && echo "   ok robots.txt present" || { echo "   FAIL"; fail=1; }
[ -f llms.txt ] && echo "   ok llms.txt present" || { echo "   FAIL"; fail=1; }

echo
if [ "$fail" -eq 0 ]; then
    echo "corridor: green, the wall is warm"
else
    echo "corridor: RED, a small thing went missing"
fi
exit $fail