import { Context, Next } from 'hono'

interface DeprecationConfig {
  version: string
  deprecatedAt: Date
  sunsetAt: Date
  message?: string
}

const deprecatedVersions: DeprecationConfig[] = [
  // Örnek: v1 gelecekte deprecated olacak
  // {
  //   version: 'v1',
  //   deprecatedAt: new Date('2024-12-01'),
  //   sunsetAt: new Date('2025-06-01'),
  //   message: 'Lütfen v2 API’ye geçiş yapın.'
  // }
]

export async function deprecationMiddleware(c: Context, next: Next) {
  const versionContext = c.get('version')
  
  if (versionContext) {
    const deprecated = deprecatedVersions.find(
      d => d.version === `v${versionContext.majorVersion}`
    )
    
    if (deprecated) {
      c.header('X-API-Deprecated', 'true')
      c.header('X-API-Deprecation-Date', deprecated.deprecatedAt.toISOString())
      c.header('X-API-Sunset-Date', deprecated.sunsetAt.toISOString())
      
      if (deprecated.message) {
        c.header('X-API-Deprecation-Message', deprecated.message)
      }
    }
  }
  
  await next()
}
