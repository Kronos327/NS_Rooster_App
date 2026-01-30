"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual email sending service (e.g., Resend, SendGrid)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("[MOCK] Contact form submitted:", { name, email, message });
    // TODO: Send email to admin with form data

    toast({
      title: "Bericht verzonden (demo)",
      description: "Bedankt voor je bericht! Dit is een demo-functie.",
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-5 pb-6 pt-8">
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">
              Contact
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-lg px-5 py-6">
        {isSubmitted ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-xl font-semibold">
                Bedankt voor je bericht!
              </h2>
              <p className="mb-6 text-muted-foreground">
                We hebben je bericht ontvangen en zullen zo snel mogelijk
                reageren.
              </p>
              <p className="mb-6 text-sm text-muted-foreground">
                (Dit is een demo - er wordt geen echte e-mail verstuurd)
              </p>
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-transparent"
              >
                Nieuw bericht versturen
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Stuur ons een bericht</CardTitle>
              <CardDescription>
                Heb je vragen, suggesties of feedback? Laat het ons weten!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    Naam
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Je naam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="je@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-medium">
                    Bericht
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Typ hier je bericht..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px] resize-none text-base"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 w-full gap-2 bg-secondary text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Verzenden..."
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Verstuur bericht
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  {/* TODO: Remove when real email service is connected */}
                  Let op: Dit is een demo-functie. Er wordt geen echte e-mail
                  verstuurd.
                </p>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
