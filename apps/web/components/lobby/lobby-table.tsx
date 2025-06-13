import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import type { Lobby } from "@/types/lfg"
import { LobbyRow } from "./lobby-row"
import { EmptyState } from "./empty-state"

type LobbyTableProps = {
  lobbies: Lobby[]
}

export function LobbyTable({ lobbies }: LobbyTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
            <TableHead className="w-[200px]">Gamer / Owner</TableHead>
            <TableHead>Game & Type</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Party</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-center">Mic</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lobbies.length > 0 ? lobbies.map((lobby) => <LobbyRow key={lobby.id} lobby={lobby} />) : <EmptyState />}
        </TableBody>
      </Table>
    </div>
  )
}
