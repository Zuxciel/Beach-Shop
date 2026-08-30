export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-full bg-sand-100" />
        <div className="h-[400px] rounded-2xl bg-sand-100" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-sand-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
