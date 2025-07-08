import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID
  const client_secret = process.env.GOOGLE_CLIENT_SECRET
  const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'https://dr-viva-v2-ac5m.vercel.app/api/oauth/callback'

  if (!client_id || !client_secret) {
    return NextResponse.json({ error: 'Missing Google OAuth credentials' }, { status: 500 })
  }

  // Exchange code for tokens
  const params = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'authorization_code',
  })

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  if (!tokenRes.ok) {
    const error = await tokenRes.text()
    return NextResponse.json({ error: 'Failed to exchange code', details: error }, { status: 500 })
  }

  const tokens = await tokenRes.json()
  // In production, store tokens securely (session, DB, etc.)
  return NextResponse.json(tokens)
} 