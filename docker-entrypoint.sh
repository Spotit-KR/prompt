#!/bin/sh
set -e

# 런타임 환경변수를 JavaScript 파일로 생성
# 클라이언트에서 window.__ENV__로 접근 가능
cat <<EOF > /app/public/env-config.js
window.__ENV__ = {
  API_BASE_URL: "${API_BASE_URL:-}"
};
EOF

echo "Runtime environment config generated:"
cat /app/public/env-config.js

# Next.js 서버 실행
exec node server.js
