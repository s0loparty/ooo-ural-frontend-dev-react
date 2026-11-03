import { useDispatch, useSelector } from 'react-redux';
import { usePartsQuery } from '../queries/parts';
import { setNumberValue, setSearchNumber } from '../store/searchSlice';
import { AppHeader } from '../components/AppHeader';
import { AppLoading } from '../components/AppLoading';
import { AppEmpty } from '../components/AppEmpty';
import { AppError } from '../components/AppError';
import { AppNotFound } from '../components/AppNotFound';
import { PartsList } from '../components/PartsList';

const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000';

function Index() {
  const dispatch = useDispatch();
  const { numberValue, searchNumber } = useSelector((state) => state.search);
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
      dispatch(setSearchNumber(number));
    }
  };
  return (
    <>
      <AppHeader
        numberValue={numberValue}
        onNumberChange={(value) => dispatch(setNumberValue(value))}
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
    </>
  );
}

export default Index;
