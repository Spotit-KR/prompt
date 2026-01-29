"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">PP</span>
            <span className="text-sm text-muted-foreground hidden sm:block">Prompt Practice</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              핵심 기능
            </Link>
            <a 
              href="#practice1" 
              onClick={(e) => {
                e.preventDefault()
                window.location.hash = "practice1"
                document.getElementById("practice")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              연습 1: 이미지 묘사
            </a>
            <a 
              href="#practice2" 
              onClick={(e) => {
                e.preventDefault()
                window.location.hash = "practice2"
                document.getElementById("practice")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              연습 2: 상황 기반
            </a>
            <Link href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              효과
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              사전 예약하기
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                핵심 기능
              </Link>
              <a 
                href="#practice1" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsMenuOpen(false)
                  window.location.hash = "practice1"
                  document.getElementById("practice")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                연습 1: 이미지 묘사
              </a>
              <a 
                href="#practice2" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsMenuOpen(false)
                  window.location.hash = "practice2"
                  document.getElementById("practice")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                연습 2: 상황 기반
              </a>
              <Link href="#benefits" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                효과
              </Link>
              <div className="pt-4">
                <Button size="sm" className="w-full bg-primary text-primary-foreground">
                  사전 예약하기
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
