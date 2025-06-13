import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Users, ShieldHalf, Trophy } from "lucide-react"

type SidebarProps = {
  activePage: string
}

export function Sidebar({ activePage }: SidebarProps) {
  const navItems = [
    { href: "/lfg", label: "Find Lobbies", icon: Search },
    { href: "/lfg/my-groups", label: "My Groups", icon: Users },
    { href: "/lfg/clans", label: "Clans", icon: ShieldHalf },
    { href: "/lfg/tournaments", label: "Tournaments", icon: Trophy },
  ]

  return (
    <aside className="w-20 lg:w-64 bg-white dark:bg-slate-800 p-4 border-r dark:border-slate-700 flex flex-col space-y-4">
      <Link href="/lfg/create" className="w-full">
        <Button variant="default" className="w-full bg-teal-600 hover:bg-teal-700 text-white justify-start">
          <PlusCircle className="mr-0 lg:mr-2 h-5 w-5" />
          <span className="hidden lg:inline">Open a Lobby</span>
        </Button>
      </Link>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
              activePage === item.href
                ? "bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 font-semibold"
                : ""
            }`}
          >
            <item.icon className="mr-0 lg:mr-3 h-5 w-5 flex-shrink-0" />
            <span className="hidden lg:inline">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
