"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MonthInfo } from "@/lib/rooster-utils";

interface JaarroosterViewProps {
  months: MonthInfo[];
  standplaats: string;
}

const WEEKDAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export function JaarroosterView({ months, standplaats }: JaarroosterViewProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">
          Jaarrooster {months[0]?.year}
        </h2>
        {standplaats && (
          <p className="text-sm text-muted-foreground">Standplaats: {standplaats}</p>
        )}
      </div>

      <div className="grid gap-4">
        {months.map((month) => (
          <Card key={`${month.year}-${month.month}`} className="overflow-hidden">
            <CardHeader className="bg-primary py-3">
              <CardTitle className="text-base font-semibold text-primary-foreground">
                {month.monthName} {month.year}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {/* Week header */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {WEEKDAYS.map((day, i) => (
                  <div
                    key={day}
                    className={cn(
                      "text-center text-xs font-medium",
                      i >= 5 ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Weeks */}
              <div className="space-y-1">
                {month.weeks.map((week, weekIndex) => (
                  <div
                    key={`week-${week.weekNumber}-${weekIndex}`}
                    className="grid grid-cols-7 gap-1"
                  >
                    {week.days.map((day, dayIndex) => (
                      <div
                        key={`day-${day.dayOfMonth}-${dayIndex}`}
                        className={cn(
                          "flex min-h-[40px] flex-col items-center justify-center rounded-md p-1 text-xs",
                          day.dayOfMonth === 0
                            ? "bg-transparent"
                            : day.isVrij
                              ? "bg-green-100 text-green-800"
                              : day.isWeekend
                                ? "bg-muted text-muted-foreground"
                                : "bg-blue-50 text-foreground"
                        )}
                      >
                        {day.dayOfMonth > 0 && (
                          <>
                            <span className="font-medium">{day.dayOfMonth}</span>
                            <span
                              className={cn(
                                "text-[10px]",
                                day.isVrij
                                  ? "font-medium text-green-700"
                                  : "text-muted-foreground"
                              )}
                            >
                              {day.dienstcode}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
