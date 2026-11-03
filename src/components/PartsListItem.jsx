import { useState } from 'react';
import {
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { currencyFormatter, formatShipmentDate } from '../helpers/currency';
import { Badge } from './ui/Badge';
import { Link } from 'react-router';
import { getPartUrl } from '../helpers/routes';

export function PartsListItem({ part }) {
  const warehouses = part.warehouses ?? [];
  const [areWarehousesOpen, setAreWarehousesOpen] = useState(false);

  return (
    <article className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <header className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{part.brand}</Badge>
            <span className="font-mono text-sm text-gray-500">
              {part.number}
            </span>
            {part.notRefund && (
              <Badge variant="neutral">Невозвратная позиция</Badge>
            )}
          </div>
          <Link
            to={getPartUrl(part)}
            className="mt-3 inline-block hover:underline"
          >
            <h3 className="text-lg font-semibold text-balance text-gray-900">
              {part.name}
            </h3>
          </Link>
        </div>

        <div className="shrink-0 sm:text-right">
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600 sm:justify-end">
            <CubeIcon className="size-4" />В наличии: {part.count} шт.
          </p>
        </div>
      </header>

      <div>
        {warehouses.length > 0 ? (
          <>
            <button
              className="flex w-full cursor-pointer items-center justify-between gap-3 bg-gray-50/70 px-5 py-4 transition-colors outline-none hover:bg-gray-100/70 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setAreWarehousesOpen((isOpen) => !isOpen)}
            >
              <span className="text-sm text-gray-900">Склады</span>
              <span className="flex items-center gap-2 text-sm text-gray-500">
                {areWarehousesOpen ? 'Скрыть' : 'Показать'} список
                <ChevronDownIcon
                  className={`size-5 text-gray-400 transition-transform ${
                    areWarehousesOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </button>

            {areWarehousesOpen && (
              <ul className="grid max-h-100 gap-4 overflow-auto p-4">
                {warehouses.map((warehouse) => {
                  const shipment = formatShipmentDate(warehouse.shipmentDate);
                  return (
                    <li
                      key={warehouse.id}
                      className="grid gap-3 rounded-lg border border-dashed border-gray-200 p-2 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 font-medium text-gray-900">
                          <BuildingStorefrontIcon className="size-4 text-gray-400" />
                          {warehouse.code || 'Склад без названия'}
                          {warehouse.own && (
                            <Badge variant="secondary">Наш склад</Badge>
                          )}
                          {warehouse.notRefund && (
                            <Badge variant="neutral">
                              Невозвратная позиция
                            </Badge>
                          )}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600">
                          <CalendarDaysIcon className="size-4" />
                          {shipment
                            ? `Отгрузка ${shipment.date}, заказ до ${shipment.time}`
                            : 'Дата отгрузки не указана'}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 tabular-nums">
                        {warehouse.stock} шт.
                      </p>
                      <p className="font-semibold text-gray-900 tabular-nums">
                        {currencyFormatter.format(warehouse.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <p className="bg-gray-50/70 px-5 py-4 text-sm text-gray-600">
            Нет информации о наличии на складах.
          </p>
        )}
      </div>
    </article>
  );
}
