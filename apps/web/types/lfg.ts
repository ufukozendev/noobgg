export type Player = {
  id: string
  name: string
  avatarUrl: string
}

export type Lobby = {
  id: string
  owner: Player
  game: { id: string; name: string; iconUrl: string }
  platform: string
  notes?: string
  gameType: string
  rank?: { name: string; tier: number; iconUrl: string }
  partySize: {
    current: number
    max: number
    members: Player[]
  }
  playingFor: string
  region: string
  language: string
  micRequired: boolean
  isPrivate: boolean
  joinMethod: "join" | "request" | "full"
  createdAt: Date
  tags?: string[]
}

export type Game = {
  id: string
  name: string
  iconUrl: string
}

export type Rank = {
  name: string
  tier: number
  iconUrl: string
}

export type FilterState = {
  game: string
  platform: string
  region: string[]
  language: string[]
  mode: string
  playingFor: string
  rankRange: [number, number]
  partySize: string
  micRequired: string
  searchTerm: string
}
