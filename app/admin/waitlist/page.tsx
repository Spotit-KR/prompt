import { createClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Calendar, TrendingUp } from "lucide-react"

interface WaitlistEntry {
  id: string
  email: string
  source: string
  created_at: string
}

async function getWaitlistData() {
  const supabase = createClient()
  
  const { data: entries, error } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching waitlist:", error)
    return { entries: [], stats: { total: 0, today: 0, thisWeek: 0 } }
  }

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - 7)

  const stats = {
    total: entries?.length || 0,
    today: entries?.filter(e => new Date(e.created_at) >= todayStart).length || 0,
    thisWeek: entries?.filter(e => new Date(e.created_at) >= weekStart).length || 0,
  }

  return { entries: entries || [], stats }
}

export default async function AdminWaitlistPage() {
  const { entries, stats } = await getWaitlistData()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">사전 예약 관리</h1>
          <p className="mt-2 text-muted-foreground">PP 서비스 사전 예약 현황을 확인하세요.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">전체 등록</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}명</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">오늘 등록</p>
                  <p className="text-2xl font-bold text-foreground">{stats.today}명</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">최근 7일</p>
                  <p className="text-2xl font-bold text-foreground">{stats.thisWeek}명</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waitlist Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              등록된 이메일 목록
            </CardTitle>
            <CardDescription>
              총 {entries.length}개의 이메일이 등록되어 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                아직 등록된 이메일이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">#</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">이메일</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">소스</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry: WaitlistEntry, index: number) => (
                      <tr key={entry.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {entries.length - index}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-foreground">{entry.email}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="text-xs">
                            {entry.source === "hero" ? "히어로" : 
                             entry.source === "cta" ? "하단 CTA" : 
                             entry.source}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formatDate(entry.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
