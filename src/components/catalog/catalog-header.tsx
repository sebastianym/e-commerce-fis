import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CatalogHeader() {
  return (
    <div className="mb-8 space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Catálogo de Camisetas</h1>
      <p className="text-muted-foreground">Explora nuestra colección de camisetas y personalízalas a tu gusto.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Buscar camisetas</label>
          <Input id="search" placeholder="Buscar camisetas..." className="max-w-96" />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

