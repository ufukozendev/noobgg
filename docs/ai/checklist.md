| Backend Controller | Related Frontend Page(s) | Status | Notes |
| ------------------- | ------------------------- | ------ | ----- |
| any-route | /(root) page (`apps/web/app/(root)/page.tsx`) | ✅ Implemented | Generic catch-all backend route; front page exists |
| distributors | – | ❌ Missing | No distributors UI yet |
| event-attendees | – | ❌ Missing | No event attendee pages |
| event-invitations | – | ❌ Missing | No invitations UI |
| events | – | ❌ Missing | No events pages |
| game-modes | – | ❌ Missing | No game modes pages |
| game-platforms | – | ❌ Missing | Relates games ↔︎ platforms, not surfaced in UI |
| game-ranks | /dashboard/gameranks | ✅ Implemented | CRUD pages for gameranks exist (list, new, edit) |
| game-regions | – | ❌ Missing | Regional support not in UI |
| games | /dashboard/games | ✅ Implemented | CRUD pages for games exist |
| languages | /dashboard/languages | ✅ Implemented | Language admin pages exist |
| lobbies | /dashboard/lobbies , /lfg | ✅ Implemented | Admin list + public LFG page |
| platforms | /dashboard/platforms | ✅ Implemented | CRUD pages for platforms exist |
| user-profiles | /profile/[username] , /profile-demo | ✅ Implemented | Profile UI implemented |
| user-social-links | (part of profile) | 🔶 Partial | Managed inside profile component, but no dedicated page |

## Overall progress

- Completed: **6** of 14 main controllers (≈ 43%)
- Partial: **1**
- Pending: **7**

Tasks remaining:
1. Build UI for Distributors management.
2. Add pages for Events (+ invitations & attendees flows).
3. Implement Game Modes, Game Platforms, and Game Regions UIs.
4. Enhance Profile UI to fully manage social links. 

ranks
competative,arena,casual
ranks
-
