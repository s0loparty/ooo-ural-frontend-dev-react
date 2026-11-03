// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import searchReducer from '../store/searchSlice';
import { getParts } from '../api';
import Index from './Index';
import Parts from './Parts';

vi.mock('../api', () => ({ getParts: vi.fn() }));

const part = {
  goodsID: 'id-1',
  number: '01089',
  brand: 'ASAM',
  name: 'Деталь ASAM',
  count: 2,
  price: 99999,
  warehouses: [],
};

function renderApp() {
  const store = configureStore({ reducer: { search: searchReducer } });
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnMount: false } },
  });
  const router = createMemoryRouter([
    { path: '/', Component: Index },
    { path: '/parts/:partNumber', Component: Parts },
  ]);
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>,
  );
}

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('поиск деталей', () => {
  it('сохраняет результаты при вводе и возвращении со страницы детали', async () => {
    getParts.mockImplementation(async ({ analogues }) => ({
      data: {
        goods: [
          {
            ...part,
            analogues:
              analogues === 'on'
                ? [{ ...part, goodsID: 'id-2', name: 'Аналог' }]
                : [],
          },
        ],
      },
    }));
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByText('Начните поиск')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Найти' }));
    await screen.findByRole('link', { name: 'Деталь ASAM' });
    const input = screen.getByLabelText('Артикул запчасти');
    await user.clear(input);
    await user.type(input, 'другой');
    expect(screen.getByRole('link', { name: 'Деталь ASAM' })).toBeTruthy();
    await user.click(screen.getByRole('link', { name: 'Деталь ASAM' }));
    expect(await screen.findByRole('link', { name: 'Аналог' })).toBeTruthy();
    await user.click(screen.getByRole('link', { name: /К поиску деталей/ }));
    expect(
      await screen.findByRole('link', { name: 'Деталь ASAM' }),
    ).toBeTruthy();
    expect(screen.getByLabelText('Артикул запчасти').value).toBe('другой');
    expect(getParts).toHaveBeenCalledWith(
      expect.objectContaining({
        number: '01089',
        brand: 'ASAM',
        analogues: 'on',
      }),
    );
  });

  it('показывает отсутствие результата для служебной пустой записи', async () => {
    getParts.mockResolvedValue({
      data: { goods: [{ goodsID: '00000000-0000-0000-0000-000000000000' }] },
    });
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: 'Найти' }));
    expect(await screen.findByText('Ничего не найдено')).toBeTruthy();
  });

  it('показывает ошибку запроса', async () => {
    getParts.mockRejectedValue(new Error('Ошибка сервиса'));
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: 'Найти' }));
    await waitFor(() =>
      expect(screen.getByText('Ошибка сервиса')).toBeTruthy(),
    );
  });

  it('показывает цену склада вместо устаревшей цены товара', async () => {
    getParts.mockResolvedValue({
      data: {
        goods: [
          {
            ...part,
            warehouses: [{ id: 'w1', code: 'Склад 1', price: 250, stock: 2 }],
          },
        ],
      },
    });
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: 'Найти' }));
    await screen.findByRole('link', { name: 'Деталь ASAM' });
    expect(screen.queryByText(/99\s?999/)).toBeNull();
    await user.click(screen.getByRole('button', { name: /Склады/ }));
    expect(screen.getByText(/250/)).toBeTruthy();
    expect(screen.getByText('Дата отгрузки не указана')).toBeTruthy();
  });
});
