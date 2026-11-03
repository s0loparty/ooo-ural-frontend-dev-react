export function AppError({ error }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-900">
      <p className="font-semibold">Не удалось выполнить поиск</p>
      <p className="mt-1 text-sm text-red-700">
        {error?.message || 'Попробуйте ещё раз немного позже.'}
      </p>
    </div>
  );
}
