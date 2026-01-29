"use client";

import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "솔직히 ChatGPT 처음 나왔을 때 다들 신기해하길래 저도 써봤는데, 뭘 물어봐야 할지 모르겠더라고요. 그냥 '이거 알려줘' 하면 원하는 답이 안 나오고... PP 써보고 나서야 내가 질문을 얼마나 두루뭉술하게 했는지 알았어요.",
    author: "김지현",
    role: "마케팅 실무자 | 5년 차",
    context: "AI 도구 도입 후 업무 효율화에 어려움을 겪던 중 PP를 경험",
  },
  {
    quote:
      "팀원들한테 'GPT 써봐' 하면 다들 '어떻게요?'라고 물어봐요. 막상 가르쳐주려니 저도 감으로 하고 있었던 거더라고요. 프롬프트에도 '잘 쓰는 법'이 있다는 걸 이제야 알았어요.",
    author: "박성민",
    role: "스타트업 CTO",
    context: "팀 AI 역량 강화 방안을 고민하던 중 인터뷰 참여",
  },
  {
    quote:
      "유튜브에서 프롬프트 잘 쓰는 법 영상 엄청 봤거든요. 근데 막상 제 상황에 적용하려니까 또 막히더라고요. 연습이 부족했던 거예요. PP의 상황 기반 연습이 딱 그 부분을 채워줬어요.",
    author: "이수진",
    role: "프리랜서 콘텐츠 크리에이터",
    context: "베타 테스트 참여 후 피드백",
  },
  {
    quote:
      "학생들한테 AI 활용법 가르치는데, 정작 '프롬프트 어떻게 쓰는 건데요?'라는 질문에 명확하게 답을 못 해주고 있었어요. 체계적으로 연습할 수 있는 커리큘럼이 필요했는데, PP가 그 역할을 해줄 것 같아요.",
    author: "최영호",
    role: "대학교 교수 | 경영학과",
    context: "AI 리터러시 교육 커리큘럼 개발 관련 인터뷰",
  },
];

export function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll();
  const { ref: cardsRef, isVisible: cardsVisible } = useAnimateOnScroll();

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            같은 고민을 했던 분들의 이야기
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI를 더 잘 쓰고 싶었지만 방법을 몰랐던 분들,
            <br />
            그리고 PP를 통해 변화를 경험한 분들의 솔직한 이야기입니다.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 hover-lift animate-on-scroll stagger-${index + 1} ${cardsVisible ? "is-visible" : ""}`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20 transition-all duration-300 group-hover:text-primary/40" />
              <p className="text-foreground mb-6 leading-relaxed pr-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-primary/70 mt-2 italic">
                  {testimonial.context}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 text-center animate-on-scroll ${cardsVisible ? "is-visible" : ""}`}
        >
          <p className="text-sm text-muted-foreground">
            * 베타 테스트 참여자 및 사전 인터뷰 참여자의 실제 의견입니다
          </p>
        </div>
      </div>
    </section>
  );
}
