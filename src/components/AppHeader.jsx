export function AppHeader({
  numberValue,
  onNumberChange,
  onSearch,
  isFetching,
}) {
  return (
    <header>
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Поиск деталей</h1>
        <small className="text-sm text-gray-800">
          Введите артикул, чтобы найти производителей
        </small>
      </div>
      <form className="space-y-1" onSubmit={onSearch}>
        <label className="inline-block font-semibold" htmlFor="inputSearch">
          Артикул запчасти
        </label>
        <div className="flex items-center gap-x-2">
          <input
            type="text"
            id="inputSearch"
            placeholder="Например 01089"
            className="block h-16 w-full rounded-xl border border-gray-300 bg-white p-4 text-lg transition-colors focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            value={numberValue}
            onChange={(e) => onNumberChange(e.target.value)}
          />
          <button
            className="h-16 cursor-pointer rounded-xl bg-blue-500 px-6 py-2 font-semibold text-white transition-colors outline-none hover:bg-blue-600 focus:ring focus:ring-blue-200 disabled:pointer-events-none"
            disabled={isFetching}
          >
            Найти
          </button>
        </div>
      </form>
    </header>
  );
}
