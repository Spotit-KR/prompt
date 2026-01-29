"use client";

import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { MessageCircleQuestion, Frown, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: MessageCircleQuestion,
    quote: "나만 GPT 써도 원하는 답이 잘 안 나오는 거야?",
    description:
      "같은 AI인데 다른 사람들은 신기한 결과물을 뽑아내고, 나는 왜 이상한 답변만 받는지 답답하셨죠?",
  },
  {
    icon: Frown,
    quote: "AI 도구 많이 나왔는데... 나만 잘 사용 못하고 있나?",
    description:
      "ChatGPT, Claude, Midjourney... 도구는 넘쳐나는데 제대로 활용 못하는 느낌이 드셨나요?",
  },
  {
    icon: HelpCircle,
    quote: "사용법이 잘못된 건가? 뭘 어떻게 물어봐야 하지?",
    description:
      "막상 AI한테 뭔가 시키려면 어떻게 말해야 할지 막막했던 경험, 다들 있으시죠.",
  },
];

export function PainPointSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: cardsRef, isVisible: cardsVisible } = useAnimateOnScroll();
  const { ref: footerRef, isVisible: footerVisible } = useAnimateOnScroll();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? "is-visible" : ""}`}
        >
          <p className="text-primary text-sm font-medium mb-4">
            혹시 이런 경험 있으신가요?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            AI 시대에 뒤처지는 느낌,
            <br />
            당신만 그런 게 아닙니다
          </h2>
        </div>

        {/* <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-on-scroll stagger-${index + 1} ${cardsVisible ? "is-visible" : ""}`}
            >
              <point.icon className="w-10 h-10 text-primary mb-6 transition-transform duration-300 group-hover:scale-110" />
              <p className="text-xl font-semibold text-foreground mb-4 text-pretty">"{point.quote}"</p>
              <p className="text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div> */}

        <div
          ref={footerRef}
          className={`mt-16 text-center animate-on-scroll ${footerVisible ? "is-visible" : ""}`}
        >
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            문제는 AI가 아니라,{" "}
            <span className="text-primary">질문하는 방법</span>입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
