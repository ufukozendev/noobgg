import { Context, Next } from 'hono'

export interface VersionContext {
  version: string
  majorVersion: number
  minorVersion: number
}

export async function versionMiddleware(c: Context, next: Next) {
  const path = c.req.path
  const versionMatch = path.match(/\/api\/v(\d+)(?:\.(\d+))?/)
  
  if (versionMatch) {
    const majorVersion = parseInt(versionMatch[1], 10)
    const minorVersion = versionMatch[2] ? parseInt(versionMatch[2], 10) : 0
    const version = `v${majorVersion}.${minorVersion}`
    
    c.set('version', {
      version,
      majorVersion,
      minorVersion,
    } as VersionContext)
  } else {
    // Default to v1 if no version specified
    c.set('version', {
      version: 'v1.0',
      majorVersion: 1,
      minorVersion: 0,
    } as VersionContext)
  }
  
  await next()
}
