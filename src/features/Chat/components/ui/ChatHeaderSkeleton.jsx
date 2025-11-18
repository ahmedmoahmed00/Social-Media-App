export default function ChatHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3 p-6 border-b border-b-gray-200 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-300"></div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-28 rounded bg-gray-300"></div>
        <div className="h-3 w-20 rounded bg-gray-200"></div>
      </div>

      <div className="ml-auto">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
