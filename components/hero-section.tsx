"use client";

import { useState, useEffect } from "react";
import { Sparkles, Users } from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";

export function HeroSection() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiUrl}/api/projects/1/waiting-count`)
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.waitingCount))
      .catch(() => setWaitlistCount(null));
  }, []);

  const handleCountUpdate = (count: number) => {
    setWaitlistCount(count);
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">
              AI 시대, 프롬프트가 경쟁력입니다
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up [animation-delay:200ms]">
            <span className="text-foreground">prompt</span>
            <span className="text-primary"> practice</span>
            <span className="text-foreground">.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto text-pretty animate-fade-in-up [animation-delay:400ms]">
            AI 도구가 아무리 좋아져도,
            <br className="sm:hidden" />
            <span className="text-foreground font-medium">질문하는 능력</span>이
            없으면 소용없습니다.
          </p>

          <p className="text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-in-up [animation-delay:500ms]">
            PP와 함께 체계적인 연습으로 프롬프트 실력을 키워보세요.
          </p>

          <div className="max-w-md mx-auto animate-fade-in-up [animation-delay:600ms]">
            <WaitlistForm
              source="hero"
              onCountUpdate={handleCountUpdate}
              waitlistCount={waitlistCount}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              사전예약 안내를 위해 이메일을 수집합니다
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in [animation-delay:800ms]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>
                현재{" "}
                <span className="text-foreground font-semibold">
                  {waitlistCount || 0}명
                </span>
                이 대기 중
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
