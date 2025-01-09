import { CatalogGrid } from '@/components/catalog/catalog-grid'
import { CatalogHeader } from '@/components/catalog/catalog-header'
import { CatalogSkeleton } from '@/components/catalog/catalog-skeleton'
import { Suspense } from 'react'


export default function CatalogPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-12 py-8">
        <CatalogHeader />
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <Suspense fallback={<CatalogSkeleton />}>
              <CatalogGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

