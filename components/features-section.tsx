"use client";

import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { ImageIcon, MessageSquareText, Target, TrendingUp } from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "연습 1: 이미지 프롬프팅",
    description:
      "주어진 이미지를 보고 AI에게 설명하듯 묘사해보세요. 얼마나 정확하게 묘사했는지 점수로 확인할 수 있습니다.",
    tag: "시각적 묘사 능력",
  },
  {
    icon: MessageSquareText,
    title: "연습 2: 상황 기반 프롬프팅",
    description:
      "실제 업무 상황을 던져드립니다. 그 상황에서 AI에게 어떻게 요청할지 직접 프롬프트를 작성하고 피드백을 받아보세요.",
    tag: "실전 활용 능력",
  },
  {
    icon: Target,
    title: "정확한 평가 시스템",
    description:
      "구체성, 명확성, 맥락 제공 등 여러 기준으로 프롬프트를 평가하고 점수를 부여합니다.",
    tag: "객관적 피드백",
  },
  {
    icon: TrendingUp,
    title: "단계별 성장 트래킹",
    description:
      "연습할수록 늘어나는 실력을 데이터로 확인하세요. 어떤 부분이 약한지도 한눈에 파악할 수 있습니다.",
    tag: "성장 시각화",
  },
];

export function FeaturesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: cardsRef, isVisible: cardsVisible } = useAnimateOnScroll();

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? "is-visible" : ""}`}
        >
          <p className="text-primary text-sm font-medium mb-4">핵심 기능</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            프롬프트 실력, <br /> 이렇게 키웁니다
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto break-keep break-word">
            단순히 예시를 보여주는 게 아닙니다.
            <br /> 직접 연습하고, 평가받고, 개선하는 사이클을 반복하며 실력을
            키워갑니다.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-on-scroll stagger-${index + 1} ${cardsVisible ? "is-visible" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-3">
                {feature.tag}
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line break-keep break-word">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
