import { Train, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const audiences = [
  {
    icon: Train,
    title: "Machinist",
    abbreviation: "MCN",
    description: "Bestuur je trein, plan je diensten",
  },
  {
    icon: Ticket,
    title: "Hoofdconducteur",
    abbreviation: "HC",
    description: "Leid je trein, ken je rooster",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-muted px-5 py-10">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Voor wie is dit?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {audiences.map((audience) => (
            <Card
              key={audience.abbreviation}
              className="border-border bg-card shadow-sm"
            >
              <CardContent className="p-4 pt-4">
                {/* Icon */}
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary">
                  <audience.icon className="h-5 w-5 text-primary-foreground" />
                </div>

                {/* Title and abbreviation */}
                <h3 className="text-base font-semibold text-card-foreground">
                  {audience.title}
                </h3>
                <span className="mb-2 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
                  {audience.abbreviation}
                </span>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {audience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
