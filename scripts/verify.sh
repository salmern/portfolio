#!/usr/bin/env bash
# One-shot verification: starts the prod server, runs checks, then stops it.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-3123}"
LOG="$(mktemp)"

npm run start -- -p "$PORT" > "$LOG" 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for i in $(seq 1 30); do
  if curl -sf -o /dev/null "http://localhost:$PORT/"; then
    break
  fi
  sleep 1
done

BASE_URL="http://localhost:$PORT" node scripts/visual-check.mjs
