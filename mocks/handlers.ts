import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:4000/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }))
  }),
  // Example: health from relative path
  rest.get('/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }))
  })
]
