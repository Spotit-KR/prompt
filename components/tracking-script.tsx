"use client";

import { useEffect } from "react";

export function TrackingScript() {
    useEffect(() => {
        // 1. 프로젝트 ID 설정
        const PROJECT_ID = 1;
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

        // 2. 방문자 ID 생성/조회 (쿠키)
        function getVisitorId() {
            let id = document.cookie.match(/visitorId=([^;]+)/)?.[1];
            if (!id) {
                id = crypto.randomUUID();
                const oneYear = 31536000;
                document.cookie = `visitorId=${id}; max-age=${oneYear}; path=/`;
            }
            return id;
        }

        // 3. 트래킹 로직 실행
        const trackVisit = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const channel = params.get("channel") || "direct";
                const postNumber = params.get("postNumber") || "";
                const visitorId = getVisitorId();

                // API 호출 (GET /api/track)
                await fetch(
                    `${API_BASE}/api/track?projectId=${PROJECT_ID}&channel=${channel}&postNumber=${postNumber}&visitorId=${visitorId}`
                );
            } catch (err) {
                console.error("Tracking failed:", err);
            }
        };

        trackVisit();
    }, []);

    return null; // UI를 렌더링하지 않는 스크립트 컴포넌트
}
