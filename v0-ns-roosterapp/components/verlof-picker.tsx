"use client";

import React from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type VerlofType = "ruilen" | "hoofdverlof" | "bijverlof" | "snipperverlof";

export const VERLOF_OPTIONS: { type: VerlofType; label: string; shortLabel: string; color: string }[] = [
  { type: "ruilen", label: "Ruilen/Geruild", shortLabel: "R", color: "bg-orange-100 text-orange-700 border-orange-300" },
  { type: "hoofdverlof", label: "Hoofdverlof", shortLabel: "HV", color: "bg-purple-100 text-purple-700 border-purple-300" },
  { type: "bijverlof", label: "Bijverlof", shortLabel: "BV", color: "bg-cyan-100 text-cyan-700 border-cyan-300" },
  { type: "snipperverlof", label: "Snipperverlof", shortLabel: "SV", color: "bg-pink-100 text-pink-700 border-pink-300" },
];

export function getVerlofConfig(type: VerlofType) {
  return VERLOF_OPTIONS.find((opt) => opt.type === type);
}

interface VerlofPickerProps {
  children: React.ReactNode;
  currentVerlof: VerlofType | null;
  onSelect: (verlof: VerlofType | null) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VerlofPicker({
  children,
  currentVerlof,
  onSelect,
  open,
  onOpenChange,
}: VerlofPickerProps) {
  const handleSelect = (verlof: VerlofType | null) => {
    onSelect(verlof);
    onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="center" side="top">
        <div className="space-y-1">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Verlof type</p>
          {VERLOF_OPTIONS.map((option) => (
            <Button
              key={option.type}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start text-sm",
                currentVerlof === option.type && "bg-accent"
              )}
              onClick={() => handleSelect(option.type)}
            >
              <span
                className={cn(
                  "mr-2 inline-flex h-5 w-8 items-center justify-center rounded border text-[10px] font-semibold",
                  option.color
                )}
              >
                {option.shortLabel}
              </span>
              {option.label}
            </Button>
          ))}
          {currentVerlof && (
            <>
              <div className="my-2 h-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm text-destructive hover:text-destructive"
                onClick={() => handleSelect(null)}
              >
                <X className="mr-2 h-4 w-4" />
                Geen verlof
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
