import { Skeleton } from "@/components/ui/skeleton"

export function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-6 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}

