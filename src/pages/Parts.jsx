import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams, useSearchParams } from 'react-router';
import { usePartQuery } from '../queries/parts';
import { AppError } from '../components/AppError';
import { AppLoading } from '../components/AppLoading';
import { AppNotFound } from '../components/AppNotFound';
import { PartsListItem } from '../components/PartsListItem';

export default function Parts() {
  const { partNumber } = useParams();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand');
  const id = searchParams.get('id');

  const { data, isFetching, error } = usePartQuery(partNumber, brand);

  const part = data?.goods?.find((item) =>
    id
      ? item.goodsID === id
      : item.brand === brand && item.number === partNumber,
  );
  const analogues = part?.analogues ?? [];

  return (
    <main>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        <ArrowLeftIcon className="size-4" />К поиску деталей
      </Link>

      <h1 className="mt-6 text-4xl font-bold text-gray-900">Деталь</h1>

      <div className="mt-8">
        {!brand && <p>Для поиска детали необходимо указать производителя.</p>}
        {isFetching && <AppLoading />}
        {!isFetching && error && <AppError error={error} />}
        {!isFetching && !error && data && !part && <AppNotFound />}
        {!isFetching && !error && part && (
          <>
            <PartsListItem part={part} />
            <section className="mt-8" aria-labelledby="analogues-title">
              <h2
                id="analogues-title"
                className="text-xl font-bold text-gray-900"
              >
                Аналоги
              </h2>
              {analogues.length > 0 ? (
                analogues.map((analogue) => (
                  <PartsListItem key={analogue.goodsID} part={analogue} />
                ))
              ) : (
                <p className="mt-3 text-sm text-gray-600">
                  Аналоги не найдены.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
