"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FilterState } from "@/types/lfg";
import { RankRangeFilter } from "./rank-range-filter";
import MultiSelectorInput, { Tag } from "./multi-selector-input";
import {
  games,
  platforms,
  regions,
  languages,
  gameModes,
  playingForOptions,
  ranksData,
} from "@/components/lobby/data/mock-data";

type FiltersProps = {
  filters: FilterState;
  onFilterChange: (filterName: string, value: any) => void;
};

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const currentRanks =
    filters.game !== "all" && ranksData[filters.game as keyof typeof ranksData]
      ? ranksData[filters.game as keyof typeof ranksData]
      : ranksData.valorant; // Default to Valorant ranks

  return (
    <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-nowrap gap-4 items-end overflow-x-auto">
        <div className="flex-shrink-0">
          <Label htmlFor="searchTerm" className="text-sm font-medium">
            Search
          </Label>
          <Input
            id="searchTerm"
            placeholder="Search by name, game, notes..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="gameFilter" className="text-sm font-medium">
            Game
          </Label>
          <Select
            value={filters.game}
            onValueChange={(v) => onFilterChange("game", v)}
          >
            <SelectTrigger id="gameFilter" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              {games.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="platformFilter" className="text-sm font-medium">
            Platform
          </Label>
          <Select
            value={filters.platform}
            onValueChange={(v) => onFilterChange("platform", v)}
          >
            <SelectTrigger id="platformFilter" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {platforms.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <MultiSelectorInput
            label="Regions"
            suggestions={regions.map((r) => ({ id: r, label: r }))}
            defaultTags={filters.region.map((r) => ({ id: r, label: r }))}
            onChange={(tags: Tag[]) =>
              onFilterChange(
                "region",
                tags.length === 0 ? ["All Regions"] : tags.map((t) => t.label)
              )
            }
          />
        </div>
        <div>
          <MultiSelectorInput
            label="Languages"
            suggestions={languages.map((l) => ({ id: l, label: l }))}
            defaultTags={filters.language.map((l) => ({ id: l, label: l }))}
            onChange={(tags: Tag[]) =>
              onFilterChange(
                "language",
                tags.length === 0 ? ["All Languages"] : tags.map((t) => t.label)
              )
            }
          />
        </div>
        <div>
          <Label htmlFor="modeFilter" className="text-sm font-medium">
            Game Mode
          </Label>
          <Select
            value={filters.mode}
            onValueChange={(v) => onFilterChange("mode", v)}
          >
            <SelectTrigger id="modeFilter" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gameModes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="playingForFilter" className="text-sm font-medium">
            Playing For
          </Label>
          <Select
            value={filters.playingFor}
            onValueChange={(v) => onFilterChange("playingFor", v)}
          >
            <SelectTrigger id="playingForFilter" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {playingForOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="micFilter" className="text-sm font-medium">
            Mic Required
          </Label>
          <Select
            value={filters.micRequired}
            onValueChange={(v) => onFilterChange("micRequired", v)}
          >
            <SelectTrigger id="micFilter" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        </div>
        <div className="mt-4">
          <RankRangeFilter
          currentRanks={currentRanks}
          rankRange={filters.rankRange}
          onRankRangeChange={(value) => onFilterChange("rankRange", value)}
        />
      </div>
    </div>
  );
}
