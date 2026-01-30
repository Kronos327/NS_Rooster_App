export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-5 py-6">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm text-muted-foreground">
          Persoonlijk hobbyproject, geen officiële NS-app.
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} — Niet verbonden aan NS
        </p>
      </div>
    </footer>
  );
}
