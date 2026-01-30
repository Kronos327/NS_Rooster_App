import { Card, CardContent } from "@/components/ui/card";
import { Info, AlertTriangle, CalendarDays, Shield } from "lucide-react";

export default function OverPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-5 pb-6 pt-8">
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">
              Over deze app
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-lg space-y-6 px-5 py-6">
        {/* Introduction */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold">
                Waarom deze app?
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Als NS-medewerker met een cyclusrooster kan het lastig zijn om
                overzicht te houden over je diensten voor het hele jaar. Wanneer
                werk je? Wanneer heb je vrij? En hoe zit het met die vakantie die
                je wilt plannen?
              </p>
              <p>
                Deze app is gemaakt om je snel inzicht te geven in je jaarrooster
                op basis van je cyclusrooster en startregel. Zo kun je
                gemakkelijk zien wanneer je welke diensten draait.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What it does */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold">
                Wat kun je met deze app?
              </h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                <span>
                  Genereer je persoonlijke jaarrooster op basis van je
                  cyclusrooster en startregel
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                <span>
                  Bekijk je diensten per maand in een overzichtelijke kalender
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                <span>
                  Exporteer je rooster naar je favoriete agenda-app (Google
                  Calendar, Apple Calendar, Outlook)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                <span>
                  Sla je instellingen op zodat je snel toegang hebt tot je
                  rooster
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Important notice */}
        <Card className="border-2 border-destructive/20 bg-destructive/5 shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-lg font-semibold text-destructive">
                Belangrijke melding
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  De officiële roosters in SHIFT zijn altijd leidend!
                </strong>
              </p>
              <p>
                Deze app geeft een indicatie van je diensten op basis van het
                basisrooster. Wijzigingen, ruildiensten, extra diensten of
                verstoringen worden niet weergegeven.
              </p>
              <p>
                Controleer altijd je officiële rooster in SHIFT voor de
                definitieve planning.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold">
                Privacy
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Deze app is een persoonlijk hobbyproject en is niet verbonden
                aan NS. Je gegevens worden alleen lokaal opgeslagen op je eigen
                apparaat en niet gedeeld met derden.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Version info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Versie 1.0.0</p>
          <p className="mt-1">Gemaakt met zorg voor NS-collega{"'"}s</p>
        </div>
      </div>
    </main>
  );
}
