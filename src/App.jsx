import { useState } from 'react';
import { usePartsQuery } from './queries/parts';
import { AppError } from './components/AppError';
import { PartsList } from './components/PartsList';
import { AppEmpty } from './components/AppEmpty';
import { AppLoading } from './components/AppLoading';
import { AppNotFound } from './components/AppNotFound';
import { AppHeader } from './components/AppHeader';

const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000';

function App() {
  const [numberValue, setNumberValue] = useState('01089');
  const [searchNumber, setSearchNumber] = useState(null);
  const {
    data: parts,
    refetch,
    isFetching,
    error,
  } = usePartsQuery(searchNumber);

  const canShowResult = !isFetching && !error && Boolean(parts);
  const foundParts =
    parts?.goods?.filter((part) => part.goodsID !== EMPTY_GOODS_ID) ?? [];
  const hasParts = foundParts.length > 0;
  const showNotFound = canShowResult && !hasParts;
  const showParts = canShowResult && hasParts;

  const handleSearch = (e) => {
    e.preventDefault();

    const number = numberValue.trim();
    if (!number || isFetching) return;

    if (number === searchNumber) {
      refetch();
    } else {
      setSearchNumber(number);
    }
  };
  return (
    <>
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <AppHeader
          numberValue={numberValue}
          onNumberChange={setNumberValue}
          onSearch={handleSearch}
          isFetching={isFetching}
        />

        <main>
          <hr className="my-8 border-gray-200" />

          {/* LOADING */}
          {isFetching && <AppLoading />}

          {/* EMPTY */}
          {!parts && !error && !isFetching && <AppEmpty />}

          {/* ERROR */}
          {!isFetching && error && <AppError error={error} />}

          {/* NO RESULTS */}
          {showNotFound && <AppNotFound />}

          {/* CONTENT */}
          {showParts && <PartsList parts={foundParts} />}
        </main>
      </section>
    </>
  );
}

export default App;
