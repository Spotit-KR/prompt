"use client"

import { useEffect, useRef, useState } from "react"

export function useAnimateOnScroll<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}
