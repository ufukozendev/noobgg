import { Hono } from 'hono'
import { homeController } from '../controllers/main.controller'
import v1Router from './v1'
// Gelecekte: import v2Router from './v2'

const router = new Hono()

// Health check endpoint (unversioned)
router.get('/', homeController)
router.get('/health', homeController)

// Versioned API routes
router.route('/', v1Router)

router.get('/api/*', (c) => {
  const path = c.req.path.replace('/api/', '/api/v1/')
  return c.redirect(path, 301)
})

export default router
