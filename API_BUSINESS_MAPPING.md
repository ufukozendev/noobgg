# Project API Business Mapping - NoobGG

## Project Overview
- **Backend Framework**: Hono v4.7.11 (lightweight web framework on Bun runtime)
- **Frontend Framework**: Next.js 15.3.3 with React 19.1.0
- **API Architecture Pattern**: RESTful API with OpenAPI documentation
- **Authentication Method**: Keycloak OAuth (frontend only - backend unprotected)
- **Database**: PostgreSQL with Drizzle ORM
- **Architecture**: Monorepo using Turborepo with shared packages

## 1. API Endpoints Summary
- **Total endpoints**: 62 REST endpoints
- **Endpoints by HTTP method**:
  - GET: 31 endpoints
  - POST: 11 endpoints
  - PUT: 10 endpoints
  - DELETE: 11 endpoints
  - PATCH: 1 endpoint
- **Public vs authenticated endpoints**: All endpoints currently public (⚠️ Security Issue)
- **API versioning strategy**: URL-based versioning (`/api/v1/`)

## 2. Complete API Registry

### REST APIs

| Endpoint | Method | Purpose | Auth Required | Request Schema | Response Schema | Used By Components |
|----------|---------|---------|---------------|----------------|-----------------|-------------------|
| `/` | GET | Home/Health check | ❌ | None | Text | System |
| `/health` | GET | Health check endpoint | ❌ | None | JSON | System |
| `/docs` | GET | Swagger UI documentation | ❌ | None | HTML | Developers |
| `/docs/openapi.json` | GET | OpenAPI specification | ❌ | None | JSON | API Documentation |
| **Games** ||||||| 
| `/api/v1/games` | GET | Get all games | ❌ | Query params | Game[] | Games Dashboard |
| `/api/v1/games/:id` | GET | Get game by ID | ❌ | None | Game | Game Details |
| `/api/v1/games` | POST | Create new game | ❌ | createGameDto | Game | Games Dashboard |
| `/api/v1/games/:id` | PUT | Update game | ❌ | updateGameDto | Game | Games Dashboard |
| `/api/v1/games/:id` | DELETE | Delete game | ❌ | None | Success | Games Dashboard |
| **Game Modes** ||||||| 
| `/api/v1/game-modes` | GET | Get all game modes | ❌ | Query params | GameMode[] | Not implemented |
| `/api/v1/game-modes/:id` | GET | Get game mode by ID | ❌ | None | GameMode | Not implemented |
| `/api/v1/game-modes` | POST | Create game mode | ❌ | createGameModeDto | GameMode | Not implemented |
| `/api/v1/game-modes/:id` | PUT | Update game mode | ❌ | updateGameModeDto | GameMode | Not implemented |
| `/api/v1/game-modes/:id` | DELETE | Delete game mode | ❌ | None | Success | Not implemented |
| **Game Ranks** ||||||| 
| `/api/v1/game-ranks` | GET | Get all game ranks | ❌ | Query params | GameRank[] | GameRanks Dashboard |
| `/api/v1/game-ranks/:id` | GET | Get game rank by ID | ❌ | None | GameRank | GameRank Details |
| `/api/v1/game-ranks` | POST | Create game rank | ❌ | createGameRankDto | GameRank | GameRanks Dashboard |
| `/api/v1/game-ranks/:id` | PUT | Update game rank | ❌ | updateGameRankDto | GameRank | GameRanks Dashboard |
| `/api/v1/game-ranks/:id` | DELETE | Delete game rank | ❌ | None | Success | GameRanks Dashboard |
| **Platforms** ||||||| 
| `/api/v1/platforms` | GET | Get all platforms | ❌ | Query params | Platform[] | Platforms Dashboard |
| `/api/v1/platforms/:id` | GET | Get platform by ID | ❌ | None | Platform | Platform Details |
| `/api/v1/platforms` | POST | Create platform | ❌ | createPlatformDto | Platform | Platforms Dashboard |
| `/api/v1/platforms/:id` | PUT | Update platform | ❌ | updatePlatformDto | Platform | Platforms Dashboard |
| `/api/v1/platforms/:id` | DELETE | Delete platform | ❌ | None | Success | Platforms Dashboard |
| **Distributors** ||||||| 
| `/api/v1/distributors` | GET | Get all distributors | ❌ | Query params | Distributor[] | Not implemented |
| `/api/v1/distributors/:id` | GET | Get distributor by ID | ❌ | None | Distributor | Not implemented |
| `/api/v1/distributors` | POST | Create distributor | ❌ | createDistributorDto | Distributor | Not implemented |
| `/api/v1/distributors/:id` | PUT | Update distributor | ❌ | updateDistributorDto | Distributor | Not implemented |
| `/api/v1/distributors/:id` | DELETE | Delete distributor | ❌ | None | Success | Not implemented |
| **User Profiles** ||||||| 
| `/api/v1/user-profiles/:id` | GET | Get user profile | ❌ | None | UserProfile | Profile Pages |
| `/api/v1/user-profiles` | POST | Create user profile | ❌ | createUserProfileDto | UserProfile | Not implemented |
| `/api/v1/user-profiles/:id` | PATCH | Update user profile | ❌ | updateUserProfileDto | UserProfile | Not implemented |
| `/api/v1/user-profiles/:id` | DELETE | Delete user profile | ❌ | None | Success | Not implemented |
| **User Social Links** ||||||| 
| `/api/v1/user-social-links` | GET | Get user social links | ❌ | Query params | UserSocialLink[] | Not implemented |
| `/api/v1/user-social-links/:id` | GET | Get social link by ID | ❌ | None | UserSocialLink | Not implemented |
| `/api/v1/user-social-links` | POST | Create social link | ❌ | createUserSocialLinkDto | UserSocialLink | Not implemented |
| `/api/v1/user-social-links/:id` | PUT | Update social link | ❌ | updateUserSocialLinkDto | UserSocialLink | Not implemented |
| `/api/v1/user-social-links/:id` | DELETE | Delete social link | ❌ | None | Success | Not implemented |
| **Events** ||||||| 
| `/api/v1/events` | GET | Get all events | ❌ | Query params | Event[] | Not implemented |
| `/api/v1/events/:id` | GET | Get event by ID | ❌ | None | Event | Not implemented |
| `/api/v1/events/upcoming` | GET | Get upcoming events | ❌ | Query params | Event[] | Not implemented |
| `/api/v1/events/popular` | GET | Get popular events | ❌ | Query params | Event[] | Not implemented |
| `/api/v1/events` | POST | Create event | ❌ | createEventDto | Event | Not implemented |
| `/api/v1/events/:id` | PUT | Update event | ❌ | updateEventDto | Event | Not implemented |
| `/api/v1/events/:id/attendees-count` | PUT | Update attendee count | ❌ | Body | Event | Not implemented |
| `/api/v1/events/:id` | DELETE | Delete event | ❌ | None | Success | Not implemented |
| **Event Attendees** ||||||| 
| `/api/v1/event-attendees` | GET | Get all attendees | ❌ | getEventAttendeesSchema | EventAttendee[] | Not implemented |
| `/api/v1/event-attendees/:id` | GET | Get attendee by ID | ❌ | None | EventAttendee | Not implemented |
| `/api/v1/event-attendees/events/:eventId/attendees` | GET | Get event attendees | ❌ | Query params | EventAttendee[] | Not implemented |
| `/api/v1/event-attendees` | POST | Join event | ❌ | createEventAttendeeDto | EventAttendee | Not implemented |
| `/api/v1/event-attendees/:id` | DELETE | Leave event | ❌ | None | Success | Not implemented |
| **Event Invitations** ||||||| 
| `/api/v1/event-invitations` | GET | Get invitations | ❌ | getEventInvitationsSchema | EventInvitation[] | Not implemented |
| `/api/v1/event-invitations/:id` | GET | Get invitation by ID | ❌ | None | EventInvitation | Not implemented |
| `/api/v1/event-invitations/users/:userId/invitations` | GET | Get user invitations | ❌ | Query params | EventInvitation[] | Not implemented |
| `/api/v1/event-invitations/events/:eventId/invitations` | GET | Get event invitations | ❌ | Query params | EventInvitation[] | Not implemented |
| `/api/v1/event-invitations` | POST | Create invitation | ❌ | createEventInvitationSchema | EventInvitation | Not implemented |
| `/api/v1/event-invitations/:id/respond` | PUT | Respond to invitation | ❌ | respondToInvitationSchema | EventInvitation | Not implemented |
| `/api/v1/event-invitations/:id` | DELETE | Delete invitation | ❌ | None | Success | Not implemented |
| **Languages** ||||||| 
| `/api/v1/languages` | GET | Get languages (paginated) | ❌ | getLanguagesSchema | LanguagePage | Languages Dashboard |
| `/api/v1/languages/all` | GET | Get all languages | ❌ | None | Language[] | Language Selectors |
| `/api/v1/languages/:id` | GET | Get language by ID | ❌ | None | Language | Language Details |
| `/api/v1/languages` | POST | Create language | ❌ | createLanguageDto | Language | Languages Dashboard |
| `/api/v1/languages/:id` | PUT | Update language | ❌ | updateLanguageDto | Language | Languages Dashboard |
| `/api/v1/languages/:id` | DELETE | Delete language | ❌ | None | Success | Languages Dashboard |
| **Lobbies** ||||||| 
| `/api/v1/lobbies` | GET | Get all lobbies | ❌ | Query params | Lobby[] | Not implemented |
| `/api/v1/lobbies/:id` | GET | Get lobby by ID | ❌ | None | Lobby | Not implemented |
| `/api/v1/lobbies` | POST | Create lobby | ❌ | createLobbyDto | Lobby | Not implemented |
| `/api/v1/lobbies/:id` | PUT | Update lobby | ❌ | updateLobbyDto | Lobby | Not implemented |
| `/api/v1/lobbies/:id` | DELETE | Delete lobby | ❌ | None | Success | Not implemented |

### GraphQL APIs
**Not implemented** - The project uses REST APIs exclusively

### WebSocket Events
**Not implemented** - No real-time communication found

### External APIs
| Service | Endpoint | Purpose | Authentication | Used By |
|---------|----------|---------|----------------|---------|
| Keycloak | Configured via env | OAuth authentication | Client ID/Secret | NextAuth |
| Image CDN | blocks.mvp-subha.me | Remote image hosting | None | Next.js Image |
| Unsplash | via URLs | Mock user avatars | None | User profiles |

## 3. Frontend API Usage Map

### By Component/Page

#### Games Dashboard (`/apps/web/app/[locale]/dashboard/games/page.tsx`)
- **APIs consumed**: 
  - `GET /api/v1/games`
  - `POST /api/v1/games`
  - `PUT /api/v1/games/:id`
  - `DELETE /api/v1/games/:id`
- **Data fetching method**: TanStack Query hooks
- **State management**: Local component state
- **Error handling**: Toast notifications
- **Loading states**: Skeleton components

#### Game Ranks Dashboard (`/apps/web/app/[locale]/dashboard/gameranks/page.tsx`)
- **APIs consumed**:
  - `GET /api/v1/game-ranks`
  - `POST /api/v1/game-ranks`
  - `PUT /api/v1/game-ranks/:id`
  - `DELETE /api/v1/game-ranks/:id`
- **Data fetching method**: TanStack Query hooks
- **Error handling**: Basic error messages
- **Loading states**: Loading spinner

#### Platforms Dashboard (`/apps/web/app/[locale]/dashboard/platforms/page.tsx`)
- **APIs consumed**:
  - `GET /api/v1/platforms`
  - `POST /api/v1/platforms`
  - `PUT /api/v1/platforms/:id`
  - `DELETE /api/v1/platforms/:id`
- **Data fetching method**: TanStack Query hooks
- **Error handling**: handleApiResponse utility
- **Loading states**: Loading indicator

#### Languages Dashboard (`/apps/web/app/[locale]/dashboard/languages/page.tsx`)
- **APIs consumed**:
  - `GET /api/v1/languages` (with pagination)
  - `GET /api/v1/languages/all`
  - `POST /api/v1/languages`
  - `PUT /api/v1/languages/:id`
  - `DELETE /api/v1/languages/:id`
- **Special features**: Pagination, sorting, search
- **Data fetching method**: TanStack Query with query params
- **Error handling**: Comprehensive error handling

#### User Profile Features
- **APIs consumed**:
  - `GET /api/v1/user-profiles/:id`
  - `GET /api/v1/user-profiles/username/:username`
- **Data fetching method**: TanStack Query hooks (read-only)
- **Note**: Uses different port (3001) as fallback

### By API Endpoint

#### `/api/v1/games`
- **Consumed by**: Games Dashboard
- **Call patterns**: CRUD operations with modals
- **Cache strategy**: Automatic invalidation on mutations
- **Data transformation**: Direct mapping

#### `/api/v1/languages`
- **Consumed by**: Languages Dashboard, Language selectors
- **Call patterns**: Paginated queries, bulk fetch for selectors
- **Cache strategy**: Separate cache keys for paginated vs all
- **Special features**: Search, sort, pagination

## 4. API Architecture Patterns

### Authentication Flow
```
User → Next.js App → NextAuth → Keycloak → JWT Token
                ↓
         Protected Routes
                ↓
         API Calls (⚠️ No backend auth validation)
```

### Request Flow
```
Component → TanStack Query Hook → Action Function → Fetch API → Backend
     ↑                                                              ↓
     ←──────────── Response Handler ←──────────────────────────────┘
```

### Error Handling Hierarchy
1. **Fetch errors** → Caught in action functions
2. **API errors** → Processed by handleApiResponse
3. **Validation errors** → Zod schemas on both ends
4. **UI errors** → Toast notifications or inline messages

### Data Caching Strategies
- **TanStack Query** default caching (5 minutes)
- **No server-side caching** implemented
- **No CDN caching** configured
- **Static assets** cached by Next.js

## 5. Data Flow Analysis

### API to Frontend Flow
1. User triggers action in UI
2. Component calls TanStack Query mutation/query
3. Hook calls action function with parameters
4. Action function makes fetch request
5. Response processed by handleApiResponse
6. Data returned to component
7. UI updates automatically via React Query

### State Management Integration
- **Local state** for UI controls (modals, forms)
- **TanStack Query** for server state
- **No global state management** (Redux, Zustand, etc.)

### Data Transformation Layers
1. **Backend**: Drizzle ORM → Plain objects
2. **API Response**: BigInt → String conversion
3. **Frontend**: Response validation with Zod
4. **Component**: Direct usage (no additional transformation)

## 6. Dependencies and Configurations

### HTTP Client Libraries
- **Frontend**: Native fetch API
- **Wrapper**: Custom action functions
- **State**: TanStack Query v5.80.2

### API Documentation Tools
- **OpenAPI/Swagger**: Available at `/docs`
- **No API client generation** from OpenAPI spec

### Environment Configurations
- **Backend**: 
  - `DATABASE_URL`: PostgreSQL connection
  - `NODE_ENV`: Development/production mode
- **Frontend**:
  - `NEXT_PUBLIC_API_URL`: API base URL
  - `AUTH_SECRET`: NextAuth secret
  - `AUTH_KEYCLOAK_ID`: Keycloak client ID
  - `AUTH_KEYCLOAK_SECRET`: Keycloak secret
  - `AUTH_KEYCLOAK_ISSUER`: Keycloak server URL

## 7. Security Analysis

### ⚠️ Critical Security Issues
1. **No Backend Authentication**: All API endpoints are publicly accessible
2. **No Authorization**: Any user can modify any data
3. **No Rate Limiting**: Vulnerable to DDoS and abuse
4. **Missing Security Headers**: No protection against common attacks
5. **Hardcoded CORS Origins**: Should be environment-based

### Authentication Mechanisms
- **Frontend**: Keycloak OAuth via NextAuth
- **Backend**: None implemented

### CORS Policies
```javascript
origin: ["http://localhost:3000", "http://localhost:3001"]
credentials: true
```

### Input Validation
- **Partial**: Some endpoints validate with Zod
- **Inconsistent**: Not all endpoints have validation

## 8. Performance Insights

### Most Called Endpoints
Based on implemented features:
1. `/api/v1/languages` - Used in multiple places
2. `/api/v1/games` - Main dashboard feature
3. `/api/v1/platforms` - Referenced by games
4. `/api/v1/game-ranks` - Game configuration

### Optimization Opportunities
1. **Implement caching headers** for GET requests
2. **Add pagination** to all list endpoints
3. **Implement field selection** to reduce payload size
4. **Add compression** middleware
5. **Implement database indexes** for common queries

### Large Payload Endpoints
- Event lists (when implemented)
- Game lists with nested relationships
- User profiles with social links

## 9. API Health Check

### ✅ Working Endpoints
- Games CRUD
- Platforms CRUD  
- Languages CRUD
- Game Ranks CRUD
- Basic user profiles (read-only)

### ⚠️ Implemented but Unused
- Distributors
- Game Modes
- Events system
- Lobbies
- User Social Links

### ❌ Missing Features
- Authentication on backend
- File upload endpoints
- Batch operations
- WebSocket support
- GraphQL API

### 📊 Documentation Gaps
- No API versioning strategy documentation
- Missing rate limit documentation
- No SLA or uptime guarantees
- Incomplete OpenAPI schemas

## 10. Recommendations

### Architecture Improvements
1. **Implement Backend Authentication**
   ```typescript
   // Add auth middleware to protected routes
   app.use('/api/v1/*', authMiddleware);
   ```

2. **Add API Gateway** for:
   - Rate limiting
   - Request logging
   - API key management
   - Request transformation

3. **Implement Caching Layer**
   - Redis for session management
   - Response caching for GET requests
   - Database query caching

### Security Enhancements
1. **Immediate Actions**:
   - Add JWT validation on backend
   - Implement rate limiting
   - Add security headers (Helmet.js)
   - Move CORS origins to environment variables

2. **Short-term**:
   - Add API key authentication option
   - Implement request signing
   - Add audit logging
   - Set up intrusion detection

### Performance Optimizations
1. **Database**: 
   - Add indexes for common queries
   - Implement connection pooling
   - Add read replicas for scaling

2. **API**:
   - Implement response compression
   - Add ETags for caching
   - Paginate all list endpoints
   - Add field filtering

3. **Frontend**:
   - Implement optimistic updates
   - Add offline support
   - Prefetch common data
   - Lazy load unused features

### Documentation Needs
1. **API Documentation**:
   - Complete OpenAPI schemas
   - Add example requests/responses
   - Document error codes
   - Create API changelog

2. **Developer Guide**:
   - Authentication flow diagram
   - Local development setup
   - Deployment guide
   - Troubleshooting guide

## Appendix A: Technology Stack Summary

### Backend
- Runtime: Bun v1.2.15
- Framework: Hono v4.7.11
- Database: PostgreSQL + Drizzle ORM
- Validation: Zod
- Documentation: OpenAPI/Swagger

### Frontend
- Framework: Next.js 15.3.3
- UI Library: React 19.1.0
- Styling: Tailwind CSS v4
- State: TanStack Query v5.80.2
- Auth: NextAuth v5.0.0-beta
- Forms: React Hook Form + Zod

### Shared
- Language: TypeScript
- Monorepo: Turborepo
- Package Manager: Bun
- Validation: Zod schemas

### Infrastructure
- Not documented (deployment strategy unknown)
- Development ports: 3000 (API), 3001 (Web)

## Appendix B: Entity Relationship Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    Games    │────▶│ Game-Platform│◀────│  Platforms  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                                          
       ├────────────▶┌──────────────┐     ┌──────────────┐
       │             │Game-Distributor◀────│ Distributors │
       │             └──────────────┘     └──────────────┘
       │
       ├────────────▶┌──────────────┐
       │             │  Game-Modes  │
       │             └──────────────┘
       │
       ├────────────▶┌──────────────┐
       │             │  Game-Ranks  │
       │             └──────────────┘
       │
       └────────────▶┌──────────────┐
                     │ Game-Regions │
                     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│User-Profiles │────▶│   Lobbies    │◀────│  Languages  │
└──────────────┘     └──────────────┘     └─────────────┘
       │                    │
       │                    ├─────▶┌───────────────┐
       │                    │      │ Lobby-Members │
       │                    │      └───────────────┘
       │                    │
       │                    └─────▶┌─────────────────┐
       │                           │Lobby-Languages  │
       │                           └─────────────────┘
       │
       ├────────────▶┌──────────────┐
       │             │    Events    │
       │             └──────────────┘
       │                    │
       │                    ├─────▶┌─────────────────┐
       │                    │      │Event-Attendees  │
       │                    │      └─────────────────┘
       │                    │
       │                    └─────▶┌───────────────────┐
       │                           │Event-Invitations  │
       │                           └───────────────────┘
       │
       └────────────▶┌────────────────────┐
                     │User-Social-Links   │
                     └────────────────────┘
```

This comprehensive API business mapping provides a complete overview of the NoobGG project's API ecosystem, highlighting both its strengths and critical areas needing improvement, particularly in security and authentication.