// 런타임 환경변수 접근 유틸리티
// Docker 컨테이너에서 주입된 환경변수를 클라이언트에서 사용

declare global {
  interface Window {
    __ENV__?: {
      API_BASE_URL?: string;
    };
  }
}

export function getEnv() {
  if (typeof window === "undefined") {
    // 서버 사이드에서는 process.env 사용
    return {
      API_BASE_URL: process.env.API_BASE_URL || "",
    };
  }

  // 클라이언트 사이드에서는 window.__ENV__ 사용
  return {
    API_BASE_URL: window.__ENV__?.API_BASE_URL || "",
  };
}
