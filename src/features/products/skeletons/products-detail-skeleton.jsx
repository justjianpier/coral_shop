export function ProductDetailSkeleton() {
  return (
    <main className="max-w-7xl w-[90%] xl:w-[75%] mx-auto py-12">
      <section className="flex flex-col gap-12 md:flex-row items-start">
        {/* Image skeleton */}
        <div className="w-full md:flex-1 bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-100 max-h-125 border border-gray-100 animate-pulse">
          <div className="h-95 w-80 rounded-xl bg-gray-200" />
        </div>

        {/* Content skeleton */}
        <div className="w-full md:flex-1 flex flex-col gap-6 animate-pulse">
          {/* Category + title */}
          <div>
            <div className="h-6 w-24 rounded-md bg-gray-200 mb-3" />

            <div className="space-y-2">
              <div className="h-8 w-full rounded bg-gray-200" />
              <div className="h-8 w-4/5 rounded bg-gray-200" />
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="h-7 w-14 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>

          {/* Description */}
          <div>
            <div className="h-4 w-28 rounded bg-gray-200 mb-3" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>
          </div>

          {/* Price + button */}
          <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="h-3 w-20 rounded bg-gray-200 mb-2" />
              <div className="h-10 w-32 rounded bg-gray-200" />
            </div>

            <div className="h-14 w-full sm:w-40 rounded-xl bg-gray-200" />
          </div>
        </div>
      </section>
    </main>
  );
}
