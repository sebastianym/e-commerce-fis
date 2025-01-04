"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtistSection } from "@/components/admin/artist-section";
import { TShirtSection } from "@/components/admin/tshirt-section";
import { LogoutButton } from "@/components/custom/LogoutButton";

function AdminPanel() {
  return (
    <main className="px-5 md:px-8 min-h-[calc(100vh-73px)] pb-20 bg-background">
      <div className="container mx-auto py-6">
        <div className="flex justify-between">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Panel de Administrador
            </h1>
            <p className="text-muted-foreground">
              Gestiona artistas y camisetas desde este panel
            </p>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>

        <Tabs defaultValue="tshirts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tshirts">Camisetas</TabsTrigger>
            <TabsTrigger value="artists">Artistas</TabsTrigger>
          </TabsList>
          <TabsContent value="tshirts" className="space-y-4">
            <TShirtSection />
          </TabsContent>
          <TabsContent value="artists" className="space-y-4">
            <ArtistSection />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default AdminPanel;
