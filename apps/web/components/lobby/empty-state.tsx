import { TableRow, TableCell } from "@/components/ui/table"
import { Gamepad2 } from "lucide-react"

export function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10 text-slate-500 dark:text-slate-400">
        <Gamepad2 size={48} className="mx-auto mb-2 text-slate-400 dark:text-slate-500" />
        No lobbies found matching your criteria. <br /> Try adjusting your filters or creating a new lobby!
      </TableCell>
    </TableRow>
  )
}
