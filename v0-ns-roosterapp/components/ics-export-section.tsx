"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { downloadICS, mockSendICSToPhone } from "@/lib/rooster-utils";
import { Download, MessageSquare, Calendar } from "lucide-react";

interface ICSExportSectionProps {
  jaar: number;
  startregel: number;
  rooster: string;
  standplaats: string;
  functiegroep: string;
}

export function ICSExportSection({
  jaar,
  startregel,
  rooster,
  standplaats,
  functiegroep,
}: ICSExportSectionProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handleDownloadICS = () => {
    downloadICS(jaar, startregel, rooster, standplaats, functiegroep);
    toast({
      title: "ICS bestand gedownload",
      description: "Het roosterbestand is gedownload naar je apparaat.",
    });
  };

  const handleSendToPhone = () => {
    if (!phoneNumber.match(/^06\d{8}$/)) {
      toast({
        title: "Ongeldig telefoonnummer",
        description: "Voer een geldig 06-nummer in (10 cijfers).",
        variant: "destructive",
      });
      return;
    }

    // TODO: Replace with actual SMS/WhatsApp service integration
    mockSendICSToPhone(phoneNumber);
    toast({
      title: "Demo: SMS zou verzonden worden",
      description: `Zou nu ICS naar ${phoneNumber} sturen via SMS/WhatsApp. (Dit is een demo-functie)`,
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-primary pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-primary-foreground">
          <Calendar className="h-5 w-5" />
          Exporteer naar Agenda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-5">
        {/* Download ICS */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Download je jaarrooster als ICS-bestand om het te importeren in je
            agenda-app (Google Calendar, Apple Calendar, Outlook, etc.).
          </p>
          <Button
            onClick={handleDownloadICS}
            size="lg"
            className="h-14 w-full gap-2 bg-secondary text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            <Download className="h-5 w-5" />
            Exporteer naar agenda (ICS)
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">of</span>
          </div>
        </div>

        {/* Send to Phone (Mock) */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-base font-medium">
            Stuur naar je telefoon (demo)
          </Label>
          <p className="text-sm text-muted-foreground">
            Voer je 06-nummer in om een link naar het ICS-bestand te ontvangen.
          </p>
          <div className="flex gap-2">
            <Input
              id="phone"
              type="tel"
              placeholder="0612345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-12 flex-1 text-base"
              maxLength={10}
            />
            <Button
              onClick={handleSendToPhone}
              size="lg"
              variant="outline"
              className="h-12 gap-2 bg-transparent px-4"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only sm:not-sr-only">Verstuur</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {/* TODO: Remove this note when real SMS integration is implemented */}
            Let op: Dit is een demo-functie. Er wordt geen echte SMS verstuurd.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
