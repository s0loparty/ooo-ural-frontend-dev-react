export function AppNotFound() {
  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center"
    >
      <p className="text-lg font-semibold text-gray-900">Ничего не найдено</p>
      <p className="mt-1 text-sm text-gray-600">
        Проверьте артикул и попробуйте ещё раз.
      </p>
    </div>
  );
}
