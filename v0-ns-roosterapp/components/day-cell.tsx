"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { VerlofPicker, getVerlofConfig, type VerlofType } from "./verlof-picker";

interface DayCellProps {
  date: string; // ISO format YYYY-MM-DD
  dayOfMonth: number;
  dienstcode: string;
  isVrij: boolean;
  isWeekend: boolean;
  verlofType: VerlofType | null;
  onVerlofChange: (date: string, verlof: VerlofType | null) => void;
}

export function DayCell({
  date,
  dayOfMonth,
  dienstcode,
  isVrij,
  isWeekend,
  verlofType,
  onVerlofChange,
}: DayCellProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const verlofConfig = verlofType ? getVerlofConfig(verlofType) : null;

  // Empty cell (padding for alignment)
  if (dayOfMonth === 0) {
    return <div className="min-h-[48px] bg-transparent" />;
  }

  const handleSelect = (verlof: VerlofType | null) => {
    onVerlofChange(date, verlof);
  };

  return (
    <VerlofPicker
      currentVerlof={verlofType}
      onSelect={handleSelect}
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
    >
      <button
        type="button"
        className={cn(
          "flex min-h-[48px] w-full flex-col items-center justify-center rounded-md p-1 text-xs transition-all",
          "hover:ring-2 hover:ring-primary/50 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          isVrij
            ? "bg-green-100 text-green-800"
            : isWeekend
              ? "bg-muted text-muted-foreground"
              : "bg-blue-50 text-foreground"
        )}
      >
        <span className="font-medium">{dayOfMonth}</span>
        <span
          className={cn(
            "text-[10px]",
            isVrij ? "font-medium text-green-700" : "text-muted-foreground"
          )}
        >
          {dienstcode}
        </span>
        {verlofConfig && (
          <span
            className={cn(
              "mt-0.5 rounded border px-1 text-[8px] font-semibold leading-tight",
              verlofConfig.color
            )}
          >
            {verlofConfig.shortLabel}
          </span>
        )}
      </button>
    </VerlofPicker>
  );
}
