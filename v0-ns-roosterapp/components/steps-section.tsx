import { MapPin, ListOrdered, Calendar } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MapPin,
    title: "Kies je standplaats en functiegroep",
    description: "Selecteer waar je werkt en je functie",
  },
  {
    number: 2,
    icon: ListOrdered,
    title: "Kies je rooster en startregel",
    description: "Geef je cyclusrooster en startregel op",
  },
  {
    number: 3,
    icon: Calendar,
    title: "Bekijk je jaarrooster per maand",
    description: "Overzicht van maandag t/m zondag",
  },
];

export function StepsSection() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Hoe werkt het?
        </h2>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              {/* Step number with icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary">
                <step.icon className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-0.5">
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Stap {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
