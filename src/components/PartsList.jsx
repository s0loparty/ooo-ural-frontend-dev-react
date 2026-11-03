import { PartsListItem } from './PartsListItem';

export function PartsList({ parts }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="text-xl font-bold text-gray-900">Результаты поиска</h2>
      <p className="mt-1 text-sm text-gray-600">
        Найденные предложения по указанному артикулу.
      </p>
      {parts?.map((part) => (
        <PartsListItem key={part.goodsID} part={part} />
      ))}
    </div>
  );
}
