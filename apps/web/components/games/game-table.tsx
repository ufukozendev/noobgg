"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useDeleteGame } from '@/features/games/api/use-games';
import type { Game } from '@/types/game';

export function GameTable({ data, onEdit }: { data: Game[]; onEdit: (g: Game) => void }) {
  const deleteMutation = useDeleteGame();

  const columns: ColumnDef<Game>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteMutation.mutate(row.original.id)}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table className="w-full text-sm">
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id} className="border-b">
            {hg.headers.map((h) => (
              <th key={h.id} className="p-2 text-left">
                {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b hover:bg-muted/50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
