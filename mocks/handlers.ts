import { rest } from 'msw'

type Role = 'fronter' | 'closer' | 'administrator'

type MockUser = {
  id: string
  email: string
  password: string
  name: string
  roles: Role[]
}

// Demo accounts for local/dev use only, until the real /auth endpoints ship (week 2).
const MOCK_USERS: MockUser[] = [
  { id: '1', email: 'fronter@tgs.com', password: 'password1', name: 'Fiona Fronter', roles: ['fronter'] },
  { id: '2', email: 'closer@tgs.com', password: 'password1', name: 'Carl Closer', roles: ['closer'] },
  { id: '3', email: 'admin@tgs.com', password: 'password1', name: 'Ana Admin', roles: ['administrator'] },
]

const MOCK_TOKENS = new Map<string, MockUser>()

export const handlers = [
  rest.get('http://localhost:4000/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }))
  }),
  // Example: health from relative path
  rest.get('/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }))
  }),

  rest.post('/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json()
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return res(ctx.status(401), ctx.json({ detail: 'Incorrect email or password.' }))
    }

    const token = `mock-token-${user.id}-${Date.now()}`
    MOCK_TOKENS.set(token, user)

    return res(
      ctx.status(200),
      ctx.json({ access_token: token, token_type: 'bearer', expires_in_min: 60 })
    )
  }),

  rest.get('/auth/me', (req, res, ctx) => {
    const authHeader = req.headers.get('authorization') || ''
    const token = authHeader.replace(/^Bearer\s+/i, '')
    const user = MOCK_TOKENS.get(token)

    if (!user) {
      return res(ctx.status(401), ctx.json({ detail: 'Not authenticated.' }))
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: user.id,
        email: user.email,
        name: user.name,
        active: true,
        roles: user.roles,
        created_at: new Date().toISOString(),
      })
    )
  }),
]
