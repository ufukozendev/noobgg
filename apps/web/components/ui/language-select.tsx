"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAllLanguages } from "@/features/languages/api/use-languages";

interface Props {
  value?: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function LanguageSelect({
  value,
  onValueChange,
  placeholder = "Select language...",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const { data: languages = [], isLoading: loading, error } = useAllLanguages();
  const selected = languages.find((l) => l.id === value);

  if (error) {
    return (
      <Button
        variant="outline"
        className={cn("justify-between", className)}
        disabled
      >
        <span className="text-muted-foreground">Error loading languages</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
          disabled={loading}
        >
          {selected ? (
            <div className="flex items-center gap-2">
              {selected.flagUrl && (
                <img
                  src={selected.flagUrl}
                  alt={`${selected.name} flag`}
                  className="h-4 w-6 object-cover rounded"
                />
              )}
              <Globe className="h-4 w-4" />
              {selected.name}
            </div>
          ) : (
            <span className="text-muted-foreground">
              {loading ? "Loading..." : placeholder}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map((lang) => (
              <CommandItem
                key={lang.id}
                data-value={lang.id}
                onSelect={() => {
                  onValueChange(lang.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2 flex-1">
                  {lang.flagUrl && (
                    <img
                      src={lang.flagUrl}
                      alt={`${lang.name} flag`}
                      className="h-4 w-6 object-cover rounded"
                    />
                  )}
                  <Globe className="h-4 w-4" />
                  <span>{lang.name}</span>
                  <span className="text-muted-foreground text-sm">
                    ({lang.code})
                  </span>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === lang.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
