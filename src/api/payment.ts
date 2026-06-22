const SECRET_KEY = 'QZONE_WEB_2026_XR'

const isDev = import.meta.env.DEV
const BASE_URL = isDev ? 'http://127.0.0.1:48080/app-api' : 'https://api.mifeng.xuanran.cc/app-api'

async function hmacSha256(message: string, key: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(key)
  const msgData = encoder.encode(message)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData)

  const bytes = new Uint8Array(signature)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export interface PayResponse {
  code: number
  data: {
    paid: boolean
    message: string
    payOrderId: number | null
    payDisplayMode: string | null
    payDisplayContent: string | null
  }
  msg: string
}

export async function createPayOrder(qq: string): Promise<PayResponse> {
  const timestamp = Date.now()
  const signature = await hmacSha256(`${qq}|${timestamp}`, SECRET_KEY)

  const res = await fetch(`${BASE_URL}/bus/qzone/web-pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qq, timestamp, signature }),
  })

  return res.json()
}
