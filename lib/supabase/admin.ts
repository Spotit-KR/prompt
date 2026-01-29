import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service Role Key를 사용하는 관리자 클라이언트
// RLS를 우회하여 모든 데이터에 접근 가능
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
