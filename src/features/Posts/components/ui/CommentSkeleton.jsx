export default function CommentSkeleton() {
  return (
    <div className="flex gap-3 p-3 animate-pulse">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
          <div className="h-3 w-12 bg-gray-200 rounded"></div>
        </div>

        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
