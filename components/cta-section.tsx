"use client"

import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Mail } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export function CTASection() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div 
        ref={ref}
        className={`max-w-4xl mx-auto text-center animate-on-scroll-scale ${isVisible ? "is-visible" : ""}`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">베타 출시 임박</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          AI를 더 잘 쓰고 싶다면,
          <br />
          <span className="text-primary">질문하는 법</span>부터 배워보세요.
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          지금 사전 예약하고 출시 알림을 받아보세요.
          <br />
          초기 사용자에게는 특별한 혜택이 제공됩니다.
        </p>
        <WaitlistForm 
          source="cta" 
          size="large"
          className="max-w-md mx-auto"
          inputClassName="bg-background"
        />
        <p className="mt-6 text-sm text-muted-foreground">스팸 없이, 출시 소식만 전해드립니다</p>
      </div>
    </section>
  )
}
