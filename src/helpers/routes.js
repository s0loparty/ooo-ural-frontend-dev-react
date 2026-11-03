export const getPartUrl = (part) => {
  const search = new URLSearchParams({
    brand: part.brand,
    id: part.goodsID,
  });

  return {
    pathname: `/parts/${encodeURIComponent(part.number)}`,
    search: search.toString(),
  };
};
