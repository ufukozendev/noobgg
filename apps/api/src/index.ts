import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import router from './routes';
import { versionMiddleware } from './middleware/version';
import { deprecationMiddleware } from './middleware/deprecation';

// burada ortak paketi çektik

const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Version detection and deprecation middleware
app.use('/api/*', versionMiddleware);
app.use('/api/*', deprecationMiddleware);

// Swagger UI ve OpenAPI dokümantasyon endpointleri
app.get('/docs', swaggerUI({ url: '/docs/openapi.json' }));

// Routes
app.route('/', router);

// Global error handler
app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({
    error: 'Internal Server Error',
    version:  (c.get as (key: string) => unknown)('version') || 'unknown',
  }, 500);
});

export default app;
