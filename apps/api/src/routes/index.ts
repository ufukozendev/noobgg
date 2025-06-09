import { Hono } from 'hono'
import { homeController } from '../controllers/v1/main.controller'
import v1Router from './v1'

const router = new Hono()

router.get('/', homeController)
router.get('/health', homeController)

router.route('/api/v1', v1Router)

router.get('/api/*', (c) => {
  const path = c.req.path.replace(/^\/api\//, '/api/v1/')
  return c.redirect(path, 301)
})

export default router
