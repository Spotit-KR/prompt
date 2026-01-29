"use client"

import { useState, useEffect } from "react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, ImageIcon, MessageSquare, Star, Lightbulb } from "lucide-react"

export function PracticePreview() {
  const [activeTab, setActiveTab] = useState<"image" | "situation">("image")
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll()
  const { ref: tabsRef, isVisible: tabsVisible } = useAnimateOnScroll()

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === "#practice1") {
        setActiveTab("image")
      } else if (hash === "#practice2") {
        setActiveTab("situation")
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <section id="practice" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-12 animate-on-scroll ${headerVisible ? "is-visible" : ""}`}
        >
          <p className="text-primary text-sm font-medium mb-4">연습 미리보기</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">이렇게 연습합니다</h2>
        </div>

        <div 
          ref={tabsRef}
          className={`flex justify-center gap-4 mb-10 animate-on-scroll ${tabsVisible ? "is-visible" : ""}`}
        >
          <Button
            variant={activeTab === "image" ? "default" : "outline"}
            onClick={() => setActiveTab("image")}
            className={`transition-all duration-300 ${activeTab === "image" ? "bg-primary text-primary-foreground scale-105" : "hover:scale-105"}`}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            연습 1: 이미지 묘사
          </Button>
          <Button
            variant={activeTab === "situation" ? "default" : "outline"}
            onClick={() => setActiveTab("situation")}
            className={`transition-all duration-300 ${activeTab === "situation" ? "bg-primary text-primary-foreground scale-105" : "hover:scale-105"}`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            연습 2: 상황 기반
          </Button>
        </div>

        <div key={activeTab} className="animate-fade-in-up [animation-delay:0ms]">
          {activeTab === "image" ? <ImagePracticePreview /> : <SituationPracticePreview />}
        </div>
      </div>
    </section>
  )
}

function ImagePracticePreview() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <div 
      id="practice1" 
      ref={ref}
      className={`grid lg:grid-cols-2 gap-8 items-start animate-on-scroll ${isVisible ? "is-visible" : ""}`}
    >
      <div className="bg-card rounded-2xl border border-border p-6 hover-lift transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-primary border-primary">
            Step 1
          </Badge>
          <span className="text-sm text-muted-foreground">이미지 확인</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted flex items-center justify-center overflow-hidden">
          <img src="/modern-minimalist-office-workspace-with-laptop-and.jpg" alt="연습 이미지" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">위 이미지를 AI 이미지 생성 도구에게 설명하듯 묘사해보세요.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 hover-lift transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              Step 2
            </Badge>
            <span className="text-sm text-muted-foreground">프롬프트 작성</span>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm text-muted-foreground">
            <p className="text-foreground">
              "미니멀한 현대식 사무실 책상 위에 맥북과 커피잔이 있는 장면. 자연광이 들어오고 깔끔한 분위기..."
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 hover-lift transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              Step 3
            </Badge>
            <span className="text-sm text-muted-foreground">결과 확인 및 평가</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="text-2xl font-bold text-foreground">87점</span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: "87%" }} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">구체적인 오브젝트 묘사</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">분위기 및 조명 설명</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
              <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
              <span>구도 및 카메라 앵글 추가 필요</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25">
          이미지 묘사 연습 시작하기
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function SituationPracticePreview() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <div 
      id="practice2" 
      ref={ref}
      className={`grid lg:grid-cols-2 gap-8 items-start animate-on-scroll ${isVisible ? "is-visible" : ""}`}
    >
      <div className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 hover-lift transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              상황
            </Badge>
            <span className="text-sm text-muted-foreground">주어진 과제</span>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-foreground font-medium mb-2">마케팅 이메일 작성</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              신규 SaaS 제품 런칭을 알리는 마케팅 이메일을 작성해야 합니다. 타겟 고객은 중소기업 대표들이고, 무료 체험
              기간을 강조해야 합니다.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 hover-lift transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              작성
            </Badge>
            <span className="text-sm text-muted-foreground">나의 프롬프트</span>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm">
            <p className="text-foreground">
              "중소기업 대표들을 위한 SaaS 제품 런칭 이메일을 작성해줘. 14일 무료 체험을 강조하고, 도입 시 업무 효율이
              30% 향상된다는 점을 어필해줘..."
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 hover-lift transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary">
              평가
            </Badge>
            <span className="text-sm text-muted-foreground">점수 및 피드백</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="text-2xl font-bold text-foreground">72점</span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: "72%" }} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">잘한 점</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>- 타겟 고객 명확히 지정</li>
                <li>- 핵심 강조점(무료 체험) 포함</li>
                <li>- 구체적인 수치(30% 향상) 제시</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">개선 포인트</h4>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">추가 고려사항을 확인하세요.</span> 이메일 길이나 톤,
                    제외해야 할 표현 등 제약 조건이 있는지 마지막에 "다른 고려할 사항은 없나요?"라고 질문을 덧붙이면 더
                    좋습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25">
          상황 기반 연습 시작하기
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
