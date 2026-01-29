-- 사전 예약 이메일 수집 테이블
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page'
);

-- 인덱스 생성 (이메일 검색 최적화)
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- RLS 활성화 (보안을 위해)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 누구나 이메일 등록 가능 (INSERT)
CREATE POLICY "Anyone can insert to waitlist" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- SELECT는 인증된 사용자만 가능 (관리자용)
-- 지금은 간단하게 service_role key로만 접근 가능하도록 설정
CREATE POLICY "Only service role can view waitlist" ON waitlist
  FOR SELECT
  USING (false);
