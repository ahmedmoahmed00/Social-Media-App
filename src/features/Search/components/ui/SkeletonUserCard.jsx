export default function SkeletonUserCard() {
  return (
    <div className="animate-pulse flex items-center gap-4 p-4  rounded-xl shadow-sm bg-white dark:bg-gray-800">
      <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full" />

      <div className="flex-1 space-y-3">
        <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded-md" />
      </div>

      <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-md" />
    </div>
  );
}
