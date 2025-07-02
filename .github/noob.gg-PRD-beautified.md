# 🕹️ **noob.gg – LFG System (MVP)**

> _A streamlined "Looking For Group" platform that lets gamers create, join, and manage multiplayer sessions—complete with chat, profiles, and social features—built for the web and designed to scale._

---

## 📑 Table of Contents
1. [TL;DR](#tldr)
2. [Goals](#goals)
   1. [Business Goals](#business-goals)
   2. [User Goals](#user-goals)
   3. [Non-Goals](#non-goals)
3. [User Stories](#user-stories)
4. [Functional Requirements](#functional-requirements)
5. [User Experience](#user-experience)
6. [Technical Considerations](#technical-considerations)
7. [👥 Development Team](#development-team)
8. [Milestones & Timeline](#milestones--timeline)
9. [Success Metrics](#success-metrics)
10. [Tech Stack Overview](#tech-stack-overview)
11. [Getting Started](#getting-started)
12. [License](#license)

---

## TL;DR<a name="tldr"></a>
noob.gg's Lobby system empowers gamers to effortlessly **create, join, and manage** game sessions for top multiplayer titles. Designed for the web with a global audience in mind, it combines matchmaking, in-lobby chat, and social connections—making it easier for players to find teammates, make friends, and build community.

---

## Goals<a name="goals"></a>

### Business Goals<a name="business-goals"></a>
- 🚀 Achieve **2 000 user registrations** within three months of MVP launch.
- 📈 Reach **30 % weekly active users** (WAU) within the first quarter.
- 🏗️ Attain **500 unique lobby creations** in the first two months.
- 💬 Foster engagement via high chat & friend-request activity.
- 🧱 Build a stable foundation for rapid feature expansion & scalability.

### User Goals<a name="user-goals"></a>
- 🔍 Quickly find or create teams for **Fortnite, CS2, League of Legends, Valorant, Rainbow Six Siege, Minecraft**.
- 💬 Seamlessly chat with other players before & after joining lobbies.
- 🤝 Build and manage a personal friends list for repeated play sessions.
- 🎮 Join public lobbies instantly or request entry to private ones.
- 🌍 Access everything via an intuitive, **web-based** interface.

### Non-Goals<a name="non-goals"></a>
- ❌ No monetization (ads, premium) in the MVP.
- 📵 No dedicated **mobile app** at launch (responsive web only).
- 🎲 No support for games beyond the six listed titles at MVP launch.

---

## User Stories<a name="user-stories"></a>

| Persona | Key Stories |
|---------|-------------|
| **Eva – Casual Gamer** | ① Browse LFG lobbies for favourite game ② Instantly join public lobby ③ Request to join private lobby |
| **Sam – Lobby Owner** | ① Set lobby as public or private ② Receive notifications for join-requests ③ Chat with lobby members |
| **Mina – Social Connector** | ① View profiles & send friend requests ② One-on-one chat with friends ③ View active & past lobbies in profile |

---

## Functional Requirements<a name="functional-requirements"></a>

### 1. Lobby Management  ▶️ **High Priority**
- Create lobbies for six supported games with **name** & **description**.
- Public lobbies: join instantly & visible to all.
- Private lobbies: request/approval flow; hidden from general list.
- Track lobby size, owner, and participant list.

### 2. Game / Session Filters  ▶️ **High Priority**
- Filter by game, skill-level, language, region/time zone, open spots.

### 3. Joining Process  ▶️ **High Priority**
- **Public** → Direct join → Redirect to lobby chat.
- **Private** → Request → Owner approves/denies → Real-time update.

### 4. User Profiles & Friends  ▶️ **High Priority**
- Profile creation on sign-up: nickname, avatar, games list, bio.
- Add/Remove friends; friend list displays status & recent activity.

### 5. Lobby & Friend Chat  ▶️ **High Priority**
- Text chat inside lobbies (members only).
- One-on-one direct chat with friends.

### 6. Notification System ▶️ **High Priority**
- Email and/or in-app notifications for requests, approvals, friend requests, messages.

### 7. Error Handling ▶️ **Medium Priority**
- Friendly error states for full lobbies, invalid links, connectivity issues.

### 8. Accessibility & Localization ▶️ **Medium Priority**
- Keyboard navigation, screen readers, high-contrast modes.
- Full Unicode support; initial UI in English (i18n-ready).

---

## User Experience<a name="user-experience"></a>

<details>
<summary>🔎 **Click to view full UX flow**</summary>

### Entry & Onboarding
1. Landing page showcases supported games.
2. Sign-up via email or social login (Google, Discord).
3. Onboarding: nickname ➜ avatar ➜ favourite games (3 max) ➜ optional bio.
4. Prompt: explore active lobbies **or** create a new one.

### Core Experience
1. **Dashboard:** Popular lobbies + "Create Lobby" CTA.
2. **Browsing:** Filters (game, region, open spots, skill level).
3. **Joining:**
   - Public → _Join_ → instant membership.
   - Private → _Request to Join_ → owner notification.
4. **Lobby View:** Member list • Chat • Details • Invite friends • Owner controls.
5. **Profiles & Social:** View profiles, add friends, direct chat.
6. **Notifications:** Bell icon & inbox for all events.

### Edge Cases & Feedback
- Lobby full → show alternative open lobbies.
- Connection errors → retry guidance.
- Duplicate friend requests → polite block message.
- Denied join → notification with alternatives.
- Leaving/removal → confirmation + next steps.

</details>

---

## Technical Considerations<a name="technical-considerations"></a>

### Architecture
- **Frontend:** Next.js 15 (React 19, Tailwind 4, shadcn).
- **Backend:** Hono.js on Bun runtime.
- **Database:** PostgreSQL 16 via Drizzle ORM.
- **Real-Time:** Socket.IO + Redis.
- **Storage:** Cloudflare R2 (S3-compatible) for images/media.
- **Auth:** Keycloak + Auth.js 5.

### Integration Points
- Social login (Google, Discord).
- Email or in-app notifications.
- Future game integrations.

### Scalability & Security
- Thousands of concurrent users & chat messages.
- Asynchronous processing for notifications/chat.
- GDPR-compliant data storage & retention (chat ≤30 days by default).

---

## 👥 Development Team<a name="development-team"></a>

| Role | Headcount | Responsibilities |
|------|-----------|------------------|
| **Product Manager** | 1 | Requirements, roadmap, KPIs, stakeholder alignment |
| **Full-Stack Engineers** | 2–3 | Frontend & backend implementation, code reviews, CI/CD |
| **UI/UX Designer** | 1 | Wireframes, visual design, accessibility audits |
| **QA / Tester** | (optional) 1 | Test plans, regression & acceptance testing, bug triage |

> **Collaboration Tools:** GitHub Projects • Figma • Slack • Notion • Storybook • Vercel Preview Envs

---

## Milestones & Timeline<a name="milestones--timeline"></a>

| Phase | Duration | Key Deliverables | Dependencies |
|-------|----------|------------------|--------------|
| **1. Planning & Design** | 3 days | Wireframes, user flows, confirmed requirements | Stakeholder approval |
| **2. Core System Implementation** | 10 days | Auth, profile setup, lobby CRUD, MVP dashboard | Dev environment, API specs |
| **3. Social & Chat Features** | 8 days | Real-time chat, friend system, notifications | Core backend complete |
| **4. UX Polish** | 3 days | Error states, accessibility, responsive QA | All core & chat features |
| **5. Testing & Launch** | 5 days | QA, UAT, launch plan, first release | Feature-complete codebase |

_Total estimate: **≈ 3–4 weeks** with a 3–5 person team._

---

## Success Metrics<a name="success-metrics"></a>

| Category | Metric | Target |
|----------|--------|--------|
| **User** | Registration count | ≥ 2 000 within 3 months |
|          | WAU / MAU | ≥ 30 % in Q1 |
|          | Avg. lobbies per user | ≥ 3 in first month |
| **Business** | Lobby creations | ≥ 500 unique in 2 months |
|             | Friend connections | ≥ 2 per active user |
| **Technical** | P95 lobby load time | ≤ 1 s |
|               | Uptime | ≥ 99.9 % |

---

## Tech Stack Overview<a name="tech-stack-overview"></a>

> _Detailed explanations & newcomer tips are available in the original PRD appendix._

| Layer | Primary Tech | Why |
|-------|--------------|-----|
| Frontend | Next.js 15 • React 19 • Tailwind 4 • shadcn | SSR/SSG, fast UI, rapid styling |
| State / Data | TanStack Query & Table | Reliable fetching & caching |
| Forms | react-hook-form • zod | Type-safe validation |
| Backend | Bun • Hono.js | Modern, fast runtime & framework |
| Database | PostgreSQL 16 • Drizzle ORM | Strong SQL, type safety |
| Real-Time | Socket.IO • Redis | Chat & lobby updates |
| Auth | Keycloak • Auth.js 5 | Enterprise-grade id & session mgmt |
| Storage | Cloudflare R2 | Scalable object storage |
| Tooling | Turborepo • Bun • ESLint • Prettier | Monorepo mgmt, speed & quality |

---

## Getting Started<a name="getting-started"></a>

1. **Install prerequisites** → Bun, Docker, Node  (see `package.json#engines`).
2. **Clone repo** & run `bun install`.
3. **Start services** ➜ `bun run dev` (spins up API @`localhost:3000` & Next.js web @`localhost:3001`).
4. **Docker-compose up** PostgreSQL 16 on port `1453` (default pw `123noobgg123++`).
5. **Happy hacking!**

---

## License<a name="license"></a>

This project is licensed under the **Apache 2.0** license. See `LICENSE` for details.

---

> _Last updated : {{DATE}} 