import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service Role Key를 사용하는 관리자 클라이언트
// RLS를 우회하여 모든 데이터에 접근 가능
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase environment variables are not set");
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey);
}
