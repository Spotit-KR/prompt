'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin/waitlist')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border p-6 shadow">
        <h1 className="mb-4 text-xl font-semibold">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-3 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}
