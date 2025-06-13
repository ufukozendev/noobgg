import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { Lobby } from "@/types/lfg";
import { getRankIcon, formatTimeAgo } from "@/utils/lfg-utils";
import {
  CheckCircle2,
  XCircle,
  Info,
  Lock,
  Target,
  Globe,
  Languages,
  CircleUserRound,
} from "lucide-react";

type LobbyRowProps = {
  lobby: Lobby;
};

export function LobbyRow({ lobby }: LobbyRowProps) {
  return (
    <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={lobby.owner.avatarUrl || "/lobby/placeholder.svg"}
              alt={lobby.owner.name}
            />
            <AvatarFallback>{lobby.owner.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">
              {lobby.owner.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Created {formatTimeAgo(lobby.createdAt)}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Image
            src={lobby.game.iconUrl || "/lobby/placeholder-logo.png"}
            alt={lobby.game.name}
            width={24}
            height={24}
            className="rounded-sm"
          />
          <div>
            <div className="font-medium text-slate-900 dark:text-white">
              {lobby.game.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {lobby.gameType} ({lobby.platform})
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {lobby.rank ? (
          <div className="flex items-center space-x-2">
            {getRankIcon(lobby.rank.tier - 1)}
            <span className="text-sm font-medium">{lobby.rank.name}</span>
          </div>
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            N/A
          </span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          {lobby.partySize.members.slice(0, 3).map((member, i) => (
            <TooltipProvider key={member.id + i}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-6 w-6 border-2 border-white dark:border-slate-800 -ml-1 first:ml-0">
                    <AvatarImage
                      src={member.avatarUrl || "/lobby/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{member.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {Array(lobby.partySize.max - lobby.partySize.current)
            .fill(0)
            .slice(0, 5 - lobby.partySize.current)
            .map((_, i) => (
              <CircleUserRound
                key={`empty-${i}`}
                className="h-6 w-6 text-slate-400 dark:text-slate-500 -ml-1 first:ml-0"
              />
            ))}
          <span className="text-sm ml-1 text-slate-600 dark:text-slate-300">
            {lobby.partySize.current}/{lobby.partySize.max}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col text-xs">
          <div className="flex items-center space-x-1">
            <Target size={14} className="text-slate-500 dark:text-slate-400" />
            <span>{lobby.playingFor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe size={14} className="text-slate-500 dark:text-slate-400" />
            <span>{lobby.region}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Languages
              size={14}
              className="text-slate-500 dark:text-slate-400"
            />
            <span>{lobby.language}</span>
          </div>
          {lobby.notes && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1 text-left text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 mt-0.5">
                  <Info size={14} />
                  <span>Notes</span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  {lobby.notes}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </TableCell>
      <TableCell className="text-center">
        {lobby.micRequired ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500 mx-auto" />
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="sm"
          variant={lobby.joinMethod === "full" ? "outline" : "default"}
          className={
            lobby.joinMethod !== "full"
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : ""
          }
          disabled={lobby.joinMethod === "full"}
        >
          {lobby.isPrivate && lobby.joinMethod !== "full" && (
            <Lock size={14} className="mr-1.5" />
          )}
          {lobby.joinMethod === "join" && "Join Lobby"}
          {lobby.joinMethod === "request" && "Request to Join"}
          {lobby.joinMethod === "full" && "Lobby Full"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
