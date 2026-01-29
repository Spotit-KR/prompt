"use client";

import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { Zap, Brain, Briefcase, Users } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "업무 생산성 2배 향상",
    description: `AI를 제대로 활용하면 \n 반복 업무 시간이 절반으로 줄어듭니다.`,
  },
  {
    icon: Brain,
    title: "창의적 사고력 강화",
    description: `좋은 질문을 하는 연습은 \n 문제 해결 능력 자체를 키워줍니다.`,
  },
  {
    icon: Briefcase,
    title: "커리어 경쟁력 확보",
    description: `AI 활용 능력은 이제 선택이 아닌 \n 필수 스킬입니다.`,
  },
  {
    icon: Users,
    title: "모든 AI 도구에 적용",
    description:
      "ChatGPT, Claude, Midjourney 등 \n 어떤 도구든 잘 쓸 수 있게 됩니다.",
  },
];

export function BenefitsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: cardsRef, isVisible: cardsVisible } = useAnimateOnScroll();

  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? "is-visible" : ""}`}
        >
          <p className="text-primary text-sm font-medium mb-4">PP와 함께라면</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            프롬프트 실력이 바꾸는 것들
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`text-center p-6 group animate-on-scroll stagger-${index + 1} ${cardsVisible ? "is-visible" : ""}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <benefit.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
