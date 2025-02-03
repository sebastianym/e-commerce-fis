"use client";
import { StampSection } from "@/components/artist/stamp-section";
import { LogoutButton } from "@/components/custom/LogoutButton";

function ArtistPanel() {
  return (
    <main className="px-5 md:px-8 min-h-[calc(100vh-73px)] pb-20 bg-background">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Panel de Artista
            </h1>
            <p className="text-muted-foreground">
              Gestiona las estampas desde este panel
            </p>
          </div>
          <div className="px-1">
            <LogoutButton onLogout={() => window.location.reload()}  />
          </div>
        </div>
        <StampSection />
      </div>
    </main>
  );
}

export default ArtistPanel;