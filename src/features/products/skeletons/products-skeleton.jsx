export function ProductsSkeleton() {
  return (
    <section className="max-w-7xl w-[90%] mx-auto py-16">
      <div className="mb-10 space-y-3">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200 md:h-9" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gray-50 shadow-md animate-pulse"
          >
            <div className="h-80 flex items-center justify-center p-4">
              <div className="w-full h-full rounded bg-gray-200" />
            </div>

            <div className="p-5">
              <div className="h-14 w-full rounded bg-gray-200 mb-4" />

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-200" />
                  <div className="h-4 w-8 rounded bg-gray-200" />
                </div>
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>

              <div className="h-6 w-16 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
