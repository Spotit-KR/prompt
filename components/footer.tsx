import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">PP</span>
            <span className="text-sm text-muted-foreground">Prompt Practice</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              이용약관
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              개인정보처리방침
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              문의하기
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">© 2026 PP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
