"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Settings, Mail } from "lucide-react";

export default function AccountPage() {
  const { user, login, register, logout, settings, isLoading } = useAuth();
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(loginEmail, loginPassword);

    if (result.success) {
      toast({
        title: "Ingelogd",
        description: "Je bent succesvol ingelogd.",
      });
      setLoginEmail("");
      setLoginPassword("");
    } else {
      toast({
        title: "Fout",
        description: result.error,
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (registerPassword.length < 6) {
      toast({
        title: "Fout",
        description: "Wachtwoord moet minimaal 6 tekens zijn.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const result = await register(registerEmail, registerPassword);

    if (result.success) {
      toast({
        title: "Account aangemaakt",
        description: "Je account is aangemaakt en je bent nu ingelogd.",
      });
      setRegisterEmail("");
      setRegisterPassword("");
    } else {
      toast({
        title: "Fout",
        description: result.error,
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Uitgelogd",
      description: "Je bent succesvol uitgelogd.",
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <header className="bg-primary px-5 pb-6 pt-8">
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />
          <div className="mx-auto max-w-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-primary-foreground">
                Mijn Account
              </h1>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-lg px-5 py-6">
          <p className="text-center text-muted-foreground">Laden...</p>
        </div>
      </main>
    );
  }

  // Logged in view
  if (user) {
    return (
      <main className="min-h-screen bg-background">
        <header className="bg-primary px-5 pb-6 pt-8">
          <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />
          <div className="mx-auto max-w-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-primary-foreground">
                Mijn Account
              </h1>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-lg space-y-6 px-5 py-6">
          {/* User Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5" />
                Accountgegevens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">E-mail</Label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Account aangemaakt
                </Label>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString("nl-NL")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Saved Settings */}
          {settings && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5" />
                  Opgeslagen instellingen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Standplaats</span>
                    <span className="font-medium">{settings.standplaats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Functiegroep</span>
                    <span className="font-medium">{settings.functiegroep}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rooster</span>
                    <span className="font-medium">{settings.rooster}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Startregel</span>
                    <span className="font-medium">Regel {settings.startregel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jaar</span>
                    <span className="font-medium">{settings.jaar}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!settings && (
            <Card className="border-0 bg-muted/50 shadow-lg">
              <CardContent className="py-6 text-center">
                <Settings className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Geen opgeslagen instellingen. Ga naar Jaarrooster om je
                  instellingen op te slaan.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="lg"
            className="h-14 w-full gap-2 bg-transparent text-base"
          >
            <LogOut className="h-5 w-5" />
            Uitloggen
          </Button>
        </div>
      </main>
    );
  }

  // Login/Register view
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-primary px-5 pb-6 pt-8">
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-secondary" />
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground">
              Mijn Account
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-5 py-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Inloggen of Registreren</CardTitle>
            <CardDescription>
              Log in om je roosterinstellingen op te slaan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Inloggen</TabsTrigger>
                <TabsTrigger value="register">Registreren</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-base">
                      E-mail
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="je@email.nl"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-base">
                      Wachtwoord
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Je wachtwoord"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 w-full bg-secondary text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Bezig..." : "Inloggen"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="mt-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-base">
                      E-mail
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="je@email.nl"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-base">
                      Wachtwoord
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Minimaal 6 tekens"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="h-12 text-base"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 w-full bg-secondary text-lg font-semibold text-secondary-foreground hover:bg-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Bezig..." : "Account aanmaken"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    {/* TODO: Add privacy policy and terms of service links */}
                    Door te registreren ga je akkoord met de voorwaarden
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {/* TODO: Replace with real authentication service */}
          Let op: Dit is een demo. Gegevens worden alleen tijdelijk opgeslagen.
        </p>
      </div>
    </main>
  );
}
