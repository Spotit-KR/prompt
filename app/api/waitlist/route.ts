import { createClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, source = "landing" } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "이메일을 입력해주세요." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { error: "이미 등록된 이메일입니다.", alreadyExists: true },
        { status: 409 }
      )
    }

    // Insert new email
    const { error } = await supabase
      .from("waitlist")
      .insert({ 
        email: email.toLowerCase(),
        source 
      })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
        { status: 500 }
      )
    }

    // Get updated count
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })

    return NextResponse.json({ 
      success: true, 
      message: "사전 예약이 완료되었습니다!",
      count: count || 0
    })

  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createClient()
    
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })

    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ count: 0 })
  }
}
