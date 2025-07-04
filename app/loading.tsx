import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <LoadingSpinner size="lg" text="Loading content..." />
    </div>
  )
}
