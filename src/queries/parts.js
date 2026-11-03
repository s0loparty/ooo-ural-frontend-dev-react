import { useQuery } from '@tanstack/react-query';
import { getParts } from '../api';

export function usePartsQuery(number) {
  return useQuery({
    queryKey: ['parts', number],
    queryFn: () => getParts({ number, info: 'on' }),
    enabled: number !== null,
    select: (response) => response.data,
  });
}

export function usePartQuery(number, brand) {
  return useQuery({
    queryKey: ['part', number, brand],
    queryFn: async () => {
      const response = await getParts({
        number,
        brand,
        analogues: 'on',
        info: 'on',
      });
      return response.data;
    },
    enabled: Boolean(number && brand),
  });
}
