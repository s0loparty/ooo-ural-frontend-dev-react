import { afterEach, expect, it, vi } from 'vitest';
import { apiClient } from './client';
import { getParts } from './index';

const originalAdapter = apiClient.defaults.adapter;
afterEach(() => {
  apiClient.defaults.adapter = originalAdapter;
});

it('сохраняет спецсимволы артикула и производителя в параметрах запроса', async () => {
  apiClient.defaults.adapter = vi.fn(async (config) => {
    const url = new URL(apiClient.getUri(config));
    expect(url.searchParams.get('number')).toBe('A&B/#');
    expect(url.searchParams.get('brand')).toBe('A&B #1');
    return {
      data: { goods: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  });
  await getParts({ number: 'A&B/#', brand: 'A&B #1' });
});

it('превращает поле error в ошибку даже при успешном HTTP-ответе', async () => {
  apiClient.defaults.adapter = async (config) => ({
    data: { error: 'Invalid key client!' },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  });
  await expect(getParts({ number: '01089' })).rejects.toThrow(
    'Invalid key client!',
  );
});
