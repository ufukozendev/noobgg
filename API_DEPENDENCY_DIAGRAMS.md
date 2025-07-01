# API Dependency Diagrams - NoobGG

## 1. Component-to-API Relationship Diagram

```mermaid
graph LR
    subgraph "Frontend Components"
        GD[Games Dashboard]
        GRD[Game Ranks Dashboard]
        PD[Platforms Dashboard]
        LD[Languages Dashboard]
        UP[User Profile]
    end
    
    subgraph "API Hooks Layer"
        UG[useGames]
        UGR[useGameRanks]
        UPL[usePlatforms]
        UL[useLanguages]
        UUP[useUserProfile]
    end
    
    subgraph "API Actions Layer"
        GA[Games Actions]
        GRA[GameRanks Actions]
        PA[Platforms Actions]
        LA[Languages Actions]
        UPA[UserProfile Actions]
    end
    
    subgraph "Backend API Endpoints"
        GE[/api/v1/games]
        GRE[/api/v1/game-ranks]
        PE[/api/v1/platforms]
        LE[/api/v1/languages]
        UPE[/api/v1/user-profiles]
    end
    
    GD --> UG
    GRD --> UGR
    PD --> UPL
    LD --> UL
    UP --> UUP
    
    UG --> GA
    UGR --> GRA
    UPL --> PA
    UL --> LA
    UUP --> UPA
    
    GA --> GE
    GRA --> GRE
    PA --> PE
    LA --> LE
    UPA --> UPE
```

## 2. API Call Flow Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant H as TanStack Hook
    participant A as Action Function
    participant F as Fetch API
    participant B as Backend API
    participant DB as Database
    
    U->>C: Triggers Action
    C->>H: Calls Query/Mutation
    H->>A: Executes Action
    A->>F: HTTP Request
    F->>B: API Call
    B->>DB: Query Data
    DB-->>B: Return Data
    B-->>F: API Response
    F-->>A: Raw Response
    A->>A: handleApiResponse()
    A-->>H: Processed Data
    H-->>C: Update State
    C-->>U: Update UI
```

## 3. Authentication Flow Diagram

```mermaid
graph TD
    U[User] --> NX[Next.js App]
    NX --> NA[NextAuth]
    NA --> KC[Keycloak]
    KC --> JWT[JWT Token]
    JWT --> NA
    NA --> SS[Session Storage]
    SS --> PR[Protected Routes]
    PR --> FC[Frontend Components]
    FC --> API[API Calls]
    API --> BE[Backend API]
    BE -.-> X[❌ No Auth Check]
    X -.-> DB[(Database)]
    
    style X fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style BE fill:#ffd43b,stroke:#fab005,stroke-width:2px
```

## 4. Data Flow Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        UI[React Components]
        FORM[React Hook Form]
    end
    
    subgraph "State Management"
        TQ[TanStack Query]
        LS[Local State]
    end
    
    subgraph "API Client Layer"
        HOOKS[Custom Hooks]
        ACTIONS[Action Functions]
        HANDLER[handleApiResponse]
    end
    
    subgraph "Network Layer"
        FETCH[Fetch API]
        HEADERS[Headers + Locale]
    end
    
    subgraph "Backend API"
        HONO[Hono Router]
        MW[Middleware Stack]
        CTRL[Controllers]
        VAL[Zod Validation]
    end
    
    subgraph "Data Layer"
        ORM[Drizzle ORM]
        PG[(PostgreSQL)]
    end
    
    UI --> FORM
    FORM --> TQ
    UI --> TQ
    TQ --> HOOKS
    HOOKS --> ACTIONS
    ACTIONS --> HANDLER
    HANDLER --> FETCH
    FETCH --> HEADERS
    HEADERS --> HONO
    HONO --> MW
    MW --> CTRL
    CTRL --> VAL
    VAL --> ORM
    ORM --> PG
```

## 5. API Endpoint Dependency Matrix

```mermaid
graph TD
    subgraph "Core Entities"
        G[Games]
        P[Platforms]
        D[Distributors]
        L[Languages]
        U[User Profiles]
    end
    
    subgraph "Game Features"
        GM[Game Modes]
        GR[Game Ranks]
        GRG[Game Regions]
    end
    
    subgraph "Social Features"
        LB[Lobbies]
        EV[Events]
        USL[User Social Links]
    end
    
    subgraph "Junction Tables"
        GP[Game-Platforms]
        GD[Game-Distributors]
        LM[Lobby Members]
        LL[Lobby Languages]
        EA[Event Attendees]
        EI[Event Invitations]
    end
    
    G --> GM
    G --> GR
    G --> GRG
    G --> GP
    G --> GD
    
    P --> GP
    D --> GD
    
    U --> LB
    U --> EV
    U --> USL
    U --> LM
    U --> EA
    U --> EI
    
    LB --> LM
    LB --> LL
    L --> LL
    
    EV --> EA
    EV --> EI
```

## 6. Frontend Feature to API Mapping

```mermaid
graph LR
    subgraph "Implemented Features"
        GF[Games Feature]
        GRF[Game Ranks Feature]
        PF[Platforms Feature]
        LF[Languages Feature]
        UPF[User Profiles Feature]
    end
    
    subgraph "Unimplemented Features"
        DF[Distributors Feature]
        GMF[Game Modes Feature]
        EF[Events Feature]
        LBF[Lobbies Feature]
        USLF[Social Links Feature]
    end
    
    subgraph "API Endpoints"
        direction TB
        IMPL[Implemented & Used APIs]
        PART[Implemented but Unused APIs]
        NONE[Not Implemented APIs]
    end
    
    GF --> IMPL
    GRF --> IMPL
    PF --> IMPL
    LF --> IMPL
    UPF --> IMPL
    
    DF -.-> PART
    GMF -.-> PART
    EF -.-> PART
    LBF -.-> PART
    USLF -.-> PART
    
    style DF fill:#ffd43b,stroke:#fab005,stroke-width:2px,stroke-dasharray: 5 5
    style GMF fill:#ffd43b,stroke:#fab005,stroke-width:2px,stroke-dasharray: 5 5
    style EF fill:#ffd43b,stroke:#fab005,stroke-width:2px,stroke-dasharray: 5 5
    style LBF fill:#ffd43b,stroke:#fab005,stroke-width:2px,stroke-dasharray: 5 5
    style USLF fill:#ffd43b,stroke:#fab005,stroke-width:2px,stroke-dasharray: 5 5
```

## 7. Error Handling Flow

```mermaid
graph TD
    API[API Call] --> TRY{Try Block}
    TRY --> FETCH[Fetch Request]
    FETCH --> RESP{Response OK?}
    RESP -->|Yes| CHECK{Check Success}
    RESP -->|No| THROW1[Throw Error]
    CHECK -->|success=true| RETURN[Return Data]
    CHECK -->|success=false| THROW2[Throw API Error]
    
    THROW1 --> CATCH[Catch Block]
    THROW2 --> CATCH
    
    CATCH --> HANDLE[handleApiResponse]
    HANDLE --> TQERR[TanStack Query Error]
    TQERR --> TOAST[Toast Notification]
    TQERR --> CONSOLE[Console Error]
    
    style THROW1 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style THROW2 fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
```

## 8. Shared Package Dependencies

```mermaid
graph TD
    subgraph "@repo/shared"
        DTO[DTO Files]
        SCHEMA[Schema Files]
        INDEX[index.ts]
    end
    
    subgraph "Backend Usage"
        BCTRL[Controllers]
        BVAL[Validation Logic]
        BERR[Error Handling]
    end
    
    subgraph "Frontend Usage"
        FFORM[Form Validation]
        FTYPE[TypeScript Types]
        FHOOK[API Hooks]
    end
    
    DTO --> INDEX
    SCHEMA --> INDEX
    
    INDEX --> BCTRL
    INDEX --> BVAL
    BVAL --> BERR
    
    INDEX --> FFORM
    INDEX --> FTYPE
    INDEX --> FHOOK
```

## 9. Security Vulnerability Map

```mermaid
graph TD
    subgraph "Current State"
        FE[Frontend Auth ✓]
        BE[Backend Auth ✗]
        RL[Rate Limiting ✗]
        SH[Security Headers ✗]
        VAL[Input Validation ~]
    end
    
    subgraph "Attack Vectors"
        PUB[Public API Access]
        DDOS[DDoS Attacks]
        INJ[Injection Attacks]
        XSS[XSS Attacks]
        CSRF[CSRF Attacks]
    end
    
    BE --> PUB
    RL --> DDOS
    VAL --> INJ
    SH --> XSS
    FE --> CSRF
    
    style BE fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style RL fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style SH fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style VAL fill:#ffd43b,stroke:#fab005,stroke-width:2px
    style FE fill:#51cf66,stroke:#37b24d,stroke-width:2px
```

## 10. Caching Strategy Diagram

```mermaid
graph LR
    subgraph "Client Side"
        COMP[Component]
        TQC[TanStack Query Cache]
        MEM[In-Memory Cache]
    end
    
    subgraph "Network"
        HTTP[HTTP Requests]
        NOCACHE[cache: no-store]
    end
    
    subgraph "Server Side"
        API[API Endpoints]
        DBCACHE[❌ No DB Cache]
        REDIS[❌ No Redis]
        CDN[❌ No CDN]
    end
    
    COMP --> TQC
    TQC --> MEM
    MEM --> HTTP
    HTTP --> NOCACHE
    NOCACHE --> API
    API --> DBCACHE
    
    style DBCACHE fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style REDIS fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
    style CDN fill:#ff6b6b,stroke:#c92a2a,stroke-width:2px
```

## 11. Environment Configuration Flow

```mermaid
graph TD
    subgraph "Frontend Environment"
        FENV[.env.local]
        NPAPI[NEXT_PUBLIC_API_URL]
        AUTH[AUTH_* variables]
    end
    
    subgraph "Backend Environment"
        BENV[.env]
        DBURL[DATABASE_URL]
        NODE[NODE_ENV]
    end
    
    subgraph "Shared Config"
        PORTS[Port Configuration]
        LOCALE[Locale Settings]
    end
    
    FENV --> NPAPI
    FENV --> AUTH
    BENV --> DBURL
    BENV --> NODE
    
    NPAPI --> PORTS
    DBURL --> PORTS
    
    AUTH --> LOCALE
    NODE --> LOCALE
```

## 12. API Lifecycle Diagram

```mermaid
stateDiagram-v2
    [*] --> Request: User Action
    Request --> Validation: Zod Schema
    Validation --> Authenticated: Check Auth
    Authenticated --> Authorized: Check Permissions
    Authorized --> Processing: Business Logic
    Processing --> Database: CRUD Operation
    Database --> Response: Format Data
    Response --> Cache: Update Cache
    Cache --> [*]: Return to Client
    
    Validation --> Error: Invalid Input
    Authenticated --> Error: No Auth
    Authorized --> Error: No Permission
    Processing --> Error: Business Error
    Database --> Error: DB Error
    Error --> [*]: Error Response
    
    note right of Authenticated: ⚠️ Currently Missing
    note right of Authorized: ⚠️ Currently Missing
    note right of Cache: ⚠️ Not Implemented
```

These diagrams provide a comprehensive visual representation of the API architecture, dependencies, and data flows in the NoobGG project, highlighting both the implemented features and the critical gaps that need to be addressed.