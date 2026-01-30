import { AlertTriangle } from "lucide-react";

export function WarningSection() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-4 text-xl font-bold text-foreground">Belangrijk</h2>

        <div className="rounded-xl border-2 border-secondary bg-secondary/10 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <AlertTriangle className="h-5 w-5 text-secondary-foreground" />
            </div>

            <div className="flex-1">
              <p className="text-base font-medium leading-relaxed text-foreground">
                Deze app is{" "}
                <span className="font-bold">alleen informatief</span>. De
                officiële roosters in{" "}
                <span className="font-bold text-primary">SHIFT</span> zijn
                altijd leidend.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Controleer je diensten altijd via de officiële kanalen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
