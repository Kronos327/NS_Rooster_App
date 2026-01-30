"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-primary px-5 pb-12 pt-8">
      {/* Decorative yellow accent bar */}
      <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />

      <div className="mx-auto max-w-lg">
        {/* Logo / Icon */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
            Rooster App
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-primary-foreground">
          Mijn Jaarrooster
        </h1>

        {/* Description */}
        <p className="mb-2 text-pretty text-lg leading-relaxed text-primary-foreground/85">
          Bekijk je jaarrooster op basis van je cyclus.
        </p>
        <p className="mb-8 text-left font-semibold text-secondary">
          SHIFT blijft altijd leidend.
        </p>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="w-full gap-2 bg-secondary py-6 text-lg font-semibold text-secondary-foreground shadow-lg transition-all hover:bg-secondary/90 active:scale-[0.98]"
        >
          <Link href="/jaarrooster">
            Start met je rooster
            <ChevronRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
