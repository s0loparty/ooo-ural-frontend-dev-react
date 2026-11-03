import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function AppLoading() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-10 text-center"
      role="status"
    >
      <ArrowPathIcon className="size-8 animate-spin text-blue-600" />
      <p className="mt-3 text-lg font-semibold text-gray-900">Ищем запчасти</p>
      <p className="mt-1 text-sm text-gray-600">Это займёт несколько секунд.</p>
    </div>
  );
}
