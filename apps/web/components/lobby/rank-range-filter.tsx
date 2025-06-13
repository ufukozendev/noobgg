"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import type { Rank } from "@/types/lfg"
import { getRankIcon } from "@/utils/lfg-utils"

type RankRangeFilterProps = {
  currentRanks: Rank[]
  rankRange: [number, number]
  onRankRangeChange: (value: [number, number]) => void
}

export function RankRangeFilter({ currentRanks, rankRange, onRankRangeChange }: RankRangeFilterProps) {
  return (
    <div className="col-span-full">
      <Label className="text-sm font-medium mb-3 block">Rank Range</Label>
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
            {getRankIcon(Math.round(rankRange[0] / (10 / (currentRanks.length - 1))))}
            <span className="text-sm font-medium">
              {currentRanks[Math.round(rankRange[0] / (10 / (currentRanks.length - 1)))]?.name || "Any Rank"}
            </span>
          </div>

          <div className="text-slate-400 font-medium">to</div>

          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
            {getRankIcon(Math.round(rankRange[1] / (10 / (currentRanks.length - 1))))}
            <span className="text-sm font-medium">
              {currentRanks[Math.round(rankRange[1] / (10 / (currentRanks.length - 1)))]?.name || "Highest Rank"}
            </span>
          </div>
        </div>

        <div className="px-2">
          <Slider
            defaultValue={[0, 10]}
            min={0}
            max={10}
            step={1}
            value={rankRange}
            onValueChange={(v) => onRankRangeChange(v as [number, number])}
            className="mt-1"
          />

          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Any Rank</span>
            <span>Highest Rank</span>
          </div>
        </div>

        <div className="flex justify-between mt-4 overflow-x-auto py-1 hide-scrollbar">
          <TooltipProvider>
            {currentRanks.map((rank, index) => (
              <Tooltip key={rank.name}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex-shrink-0 flex flex-col items-center cursor-pointer transition-opacity ${
                      index >= Math.round(rankRange[0] / (10 / (currentRanks.length - 1))) &&
                      index <= Math.round(rankRange[1] / (10 / (currentRanks.length - 1)))
                        ? "opacity-100"
                        : "opacity-40"
                    }`}
                    onClick={() => {
                      // If clicked rank is outside current range, update range to include it
                      const currentMin = Math.round(rankRange[0] / (10 / (currentRanks.length - 1)))
                      const currentMax = Math.round(rankRange[1] / (10 / (currentRanks.length - 1)))

                      if (index < currentMin) {
                        onRankRangeChange([index * (10 / (currentRanks.length - 1)), rankRange[1]])
                      } else if (index > currentMax) {
                        onRankRangeChange([rankRange[0], index * (10 / (currentRanks.length - 1))])
                      }
                    }}
                  >
                    {getRankIcon(index)}
                    <span className="text-xs mt-1">{rank.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{rank.name}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
