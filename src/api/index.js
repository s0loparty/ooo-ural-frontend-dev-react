import { apiClient } from './client';

export function getParts(params) {
  const { number, brand = '', analogues = 'off', info = 'off' } = params;
  return apiClient.get('/', {
    // axios под капотом сам кодирует спец. символы
    params: {
      number,
      brand,
      analogues,
      info,
    },
  });
}
