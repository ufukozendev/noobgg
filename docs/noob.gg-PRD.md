# noob.gg LFG System (MVP)

### TL;DR

noob.gg’s LFG Lobby system empowers gamers to effortlessly create, join,
and manage game sessions for top multiplayer titles. Designed for web
and a global audience, it brings together matchmaking, in-lobby chat,
and social connections—making it easier for players to find teammates,
make friends, and build their gaming community.

------------------------------------------------------------------------

## Goals

### Business Goals

- Achieve at least 2,000 user registrations within three months of MVP
  launch.

- Reach a weekly active user rate of 30%+ within the first quarter.

- Attain a minimum of 500 unique lobby creations in the first two
  months.

- Foster user engagement through high chat and friend-request activity.

- Build a stable foundation for rapid feature expansion and scalability.

### User Goals

- Quickly and easily find or create teams for Fortnite, CS2, League of
  Legends, Valorant, Rainbow Six Siege, and Minecraft.

- Seamlessly connect and chat with other players before and after
  joining lobbies.

- Build and manage a personal friends list for repeated play sessions.

- Join public lobbies instantly or request entry to private ones,
  maintaining control and privacy.

- Access the full experience through an intuitive, web-based interface.

### Non-Goals

- No monetization features in the MVP (no ads, no premium).

- No mobile application support (web only for launch).

- No support for games beyond the six stated titles at MVP launch.

------------------------------------------------------------------------

## User Stories

**Persona 1: Casual Gamer ("Eva")**

- As a gamer, I want to browse LFG lobbies for my favorite game, so that
  I can join a group quickly.

- As a gamer, I want to join a public lobby instantly, so that I can
  start playing without delay.

- As a gamer, I want to request to join private lobbies and receive
  confirmation, so that I can play with select groups.

**Persona 2: Lobby Owner ("Sam")**

- As a lobby creator, I want to set my lobby as public or private, so
  that I can control who joins.

- As a lobby owner, I want to receive notifications when users request
  access, so that I can accept or reject them easily.

- As a lobby owner, I want to chat with lobby members, so that I can
  coordinate easily before gameplay.

**Persona 3: Social Connector ("Mina")**

- As a user, I want to view profiles and send friend requests to other
  gamers, so I can build a network.

- As a user, I want to chat one-on-one with friends or group chat within
  a lobby.

- As a user, I want to view my active and past lobbies on my profile
  page to keep track of sessions.

------------------------------------------------------------------------

## Functional Requirements

- **Lobby Management (High Priority)**

  - Lobby creation for six supported games; users select game, set lobby
    name, and description.

  - Public lobbies: join instantly; visible to all.

  - Private lobbies: join via request/approval; not open to all.

  - Manages lobby size, owner, and participant list.

- **Game/Session Filters (High Priority)**

  - Filters by game, skill-level, language (optional), region/time zone,
    and open/closed lobbies.

- **Joining Process (High Priority)**

  - Public: direct join—user becomes member immediately.

  - Private: “request to join” triggers notification to lobby owner;
    owner approves or denies.

- **User Profiles & Friends (High Priority)**

  - User profile creation upon sign-up: nickname, avatar, list of games,
    bio (optional).

  - Add/remove friends; view friend list.

  - User profiles display friend status and recent activity.

- **Lobby & Friend Chat (High Priority)**

  - Text-based chat in lobbies (visible to members).

  - One-on-one direct chat with friends.

- **Notification System (High Priority)**

  - Email and/or in-app notifications for requests, approvals, friend
    requests, and messages.

- **Error Handling (Medium Priority)**

  - User-friendly error states for full lobbies, invalid links, failed
    actions, and connectivity issues.

- **Accessibility & Localization (Medium Priority)**

  - Support keyboard navigation, screen readers, high-contrast modes.

  - Unicode support for global chat and names; all UI in English.

------------------------------------------------------------------------

## User Experience

**Entry Point & First-Time User Experience**

- Users visit noob.gg on web and are greeted with a clean, visually
  appealing landing page showcasing supported games.

- Users can sign up with email or existing social login (e.g., Google,
  Discord).

- New users are prompted to set a nickname, select an avatar, list up to
  three favorite games, and write a short bio (optional).

- The onboarding flow recommends exploring active LFG lobbies or
  creating a new one.

**Core Experience**

- **Step 1:** Landing on the dashboard

  - Displays popular lobbies across the six games.

  - Header features game filters and "Create Lobby" button for quick
    access.

- **Step 2:** Browsing & Filtering Lobbies

  - Users filter by game, region, number of open spots, or skill level
    (if specified).

  - Lists show summary: game, lobby name, owner, members, and join type
    (public/private).

- **Step 3:** Joining Lobbies

  - Public Lobby: “Join” button immediately adds user to lobby;
    redirected to lobby chat.

  - Private Lobby: “Request to Join” sends notification to owner; user
    sees pending status.

  - Owner receives notification, approves/denies; user is updated
    instantly.

- **Step 4:** Lobby Participation

  - Lobby interface displays member list, chat box, lobby details, and a
    button to invite friends.

  - Real-time chat for coordination.

  - Lobby owner has option to kick participants, start session, or close
    lobby.

- **Step 5:** Profile & Social Features

  - Users view profiles by clicking names in lobbies or chat.

  - "Add Friend" initiates friend request; notification sent.

  - Accepted friends appear in user’s list; direct 1:1 chat unlocked.

- **Step 6:** Notifications & Messaging

  - Bell icon and inbox for requests, approvals, friend requests, and
    new messages.

**Advanced Features & Edge Cases**

- Lobby is full: “Lobby Full” message with suggested alternative open
  lobbies.

- Connection errors: clear instructions to retry or contact support.

- Duplicate friend requests: blocked with clear explanation.

- Denied join: polite notification and option to browse public lobbies.

- Leaving or being removed: User gets confirmation and info about next
  steps.

**UI/UX Highlights**

- Minimalist design with high contrast and readable fonts.

- Responsive layout for desktops and laptops.

- All action buttons are visually distinct and clearly labeled.

- Error and success states are visually prominent and written in plain
  English.

- Avatar and nickname help users quickly identify each other.

- All chat fields and profile inputs fully support Unicode.

------------------------------------------------------------------------

## Narrative

Eva, a 22-year-old gamer from Berlin, logs on to noob.gg with a single
goal: find teammates for a Friday night Valorant session. The platform’s
welcome screen invites her to set up her profile, where she selects
Valorant, fortifies her nickname, and personalizes her avatar. Browsing
the lobbies with game and region filters, Eva finds a “Chill Valorant
(EU)” lobby marked as public with two open slots. She clicks “Join” and
instantly enters the lively team chat, where players are sharing
strategies and scheduling their play.

With a few friendly messages, Eva bonds with other members and adds a
teammate as a friend. Once the game is launched, the group transitions
seamlessly to their match—having already built rapport and synchronized
their roles. After the session, Eva receives a friend request, starting
a new gaming friendship. Later, she creates her own lobby and is pinged
by new join requests, picking members who seem most active and positive.
With each match, Eva grows her network, coming back not only for the
games but the community she’s helped shape. For noob.gg, it’s proof that
connecting gamers with the right LFG system makes every session more
fun, social, and memorable.

------------------------------------------------------------------------

## Success Metrics

### User-Centric Metrics

<table style="min-width: 50px">
<tbody>
<tr>
<th><p>Metric</p></th>
<th><p>Measurement Method</p></th>
</tr>
&#10;<tr>
<td><p>Weekly Active Users (WAU)</p></td>
<td><p>Unique users who log in at least once per week</p></td>
</tr>
<tr>
<td><p>Lobby Creation Rate</p></td>
<td><p>Number of lobbies created per day/week</p></td>
</tr>
<tr>
<td><p>Average Lobby Join Success</p></td>
<td><p>Ratio of successful joins/requests to attempts</p></td>
</tr>
<tr>
<td><p>Messages Sent per User</p></td>
<td><p>How many chat messages sent per active user</p></td>
</tr>
<tr>
<td><p>Friend Requests Sent/Accepted</p></td>
<td><p>Daily/weekly count per user and as a global total</p></td>
</tr>
</tbody>
</table>

### Business Metrics

<table style="min-width: 50px">
<tbody>
<tr>
<th><p>Metric</p></th>
<th><p>Measurement Method</p></th>
</tr>
&#10;<tr>
<td><p>Total Registrations</p></td>
<td><p>New user accounts per week/month</p></td>
</tr>
<tr>
<td><p>User Engagement</p></td>
<td><p>DAU/WAU/MAU ratios, session duration</p></td>
</tr>
<tr>
<td><p>Churn Rate</p></td>
<td><p>Percentage of users inactive after 30 days</p></td>
</tr>
</tbody>
</table>

### Technical Metrics

<table style="min-width: 50px">
<tbody>
<tr>
<th><p>Metric</p></th>
<th><p>Target/Description</p></th>
</tr>
&#10;<tr>
<td><p>App Uptime</p></td>
<td><p>99.5% or higher during launch week</p></td>
</tr>
<tr>
<td><p>Join/Chat Latency</p></td>
<td><p>&lt; 1 second per action</p></td>
</tr>
<tr>
<td><p>Error Rate</p></td>
<td><p>&lt; 2% failures on lobby/chat operations</p></td>
</tr>
<tr>
<td><p>International Support</p></td>
<td><p>100% Unicode for usernames, chat, etc.</p></td>
</tr>
</tbody>
</table>

### Tracking Plan

- User registration, profile completion

- Lobby creation, join, and close events

- Friend request sent, accepted, denied

- Chat message sent (lobby & friend)

- Notifications sent and actioned

- Error and edge case occurrences

------------------------------------------------------------------------

## Technical Considerations

### Technical Needs

- **Frontend:** Responsive web app (HTML5/JS/CSS); core pages:
  dashboard, lobby list, lobby detail, chat, profiles, settings.

- **Backend:** Handles authentication, lobby/session management, chat
  (real-time, with delivery confirmation), friends/notifications,
  profile data.

- **APIs:** For user authentication, lobby CRUD
  (create/read/update/delete), messaging, friend system, notifications.

- **Extensible Data Model:** Lobby structure supports new game types and
  future expansions.

- **Localization:** Full Unicode support for all text fields;
  future-proofed for multi-language UI.

### Integration Points

- 3rd-party authentication (Google, Discord, or similar for MVP).

- Email or in-app notification service.

- (Future) Additional game integrations via standard interfaces.

### Data Storage & Privacy

- Secure storage for user data (hashed passwords, encrypted chat/friend
  data).

- Lobby and chat data retained for defined period (configurable,
  defaults to 30 days).

- Compliance with GDPR and other relevant regulations for international
  users.

### Scalability & Performance

- Designed to handle thousands of concurrent users and chat messages.

- Asynchronous processing for notifications and chat.

- Efficient lobby search and filtering to keep UI responsive.

### Potential Challenges

- Real-time communication reliability (latency, ordering, delivery).

- Edge case handling for lobby state changes (owners leaving, forced
  removals).

- International time zones and regional preferences for lobby grouping.

- Mitigating spam and abusive behavior in lobbies and chat.

------------------------------------------------------------------------

## Milestones & Sequencing

### Project Estimate

- Medium (~3–4 weeks from start to live MVP)

### Team Size & Composition

- Small team (3–5 people):

  - 1 Product Manager (requirements, metrics, testing)

  - 2–3 Engineers (frontend, backend, integrations)

  - 1 Designer (UI/UX, accessibility, wireframes)

  - (Optional: 1 QA/tester for major checkpoints)

### Suggested Phases

**1. Planning & Design (3 days)**

- Deliverables: Wireframes, user flows, requirements confirmed

- Dependencies: Stakeholder alignment, wireframe approval

**2. Core System Implementation (10 days)**

- Deliverables: User authentication, profile setup, lobby CRUD backend,
  MVP frontend dashboard

- Dependencies: Dev environment, API specs

**3. Social & Chat Features (8 days)**

- Deliverables: In-lobby chat, friend system, direct messaging,
  notifications

- Dependencies: Core backend API done

**4. User Experience & Polish (3 days)**

- Deliverables: Error handling, UI accessibility, mobile web QA,
  localization (Unicode)

- Dependencies: Core and chat features implemented

**5. Testing & Launch (5 days)**

- Deliverables: Internal QA, user acceptance testing, launch plan, first
  release live

- Dependencies: All features complete, test accounts

------------------------------------------------------------------------
