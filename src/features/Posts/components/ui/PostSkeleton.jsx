function PostSkeleton() {
  return (
    <div className="p-main border flex flex-col gap-6 rounded-lg border-primary dark:border-dark-primary animate-pulse">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-col gap-1 w-32">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24" />
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
      </header>

      <div className="flex flex-col gap-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded w-full" />
        <div className="flex items-center gap-2 mt-3">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
