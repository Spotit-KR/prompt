#!/bin/sh
set -e

# 런타임 환경변수를 프론트엔드 빌드 파일(.js)에 동적으로 치환
# Build 시 NEXT_PUBLIC_API_URL=__API_BASE_URL__ 등으로 설정되어 있다고 가정
# 또는 코드 내에서 process.env.NEXT_PUBLIC_API_URL 값을 치환

echo "Substituting environment variables in Next.js build files..."

# 대상 디렉토리 설정 (.next)
TARGET_DIR="/app/.next"

if [ -d "$TARGET_DIR" ]; then
  # API_BASE_URL 치환
  if [ -n "$API_BASE_URL" ]; then
    find "$TARGET_DIR" -type f -name "*.js" -exec sed -i "s|__API_BASE_URL__|$API_BASE_URL|g" {} +
  fi
fi

# 기존 방식 유지 (Legacy support for window.__ENV__)
# 클라이언트에서 window.__ENV__로 접근 가능
cat <<EOF > /app/public/env-config.js
window.__ENV__ = {
  API_BASE_URL: "${API_BASE_URL:-}"
};
EOF

echo "Runtime environment config generated."

# Next.js 서버 실행
exec node server.js
