# Polymarket Copytrading Bot

Бот для копирования сделок выбранных трейдеров на [Polymarket](https://polymarket.com).
Следит за кошельками-лидерами, повторяет их сделки со своего кошелька с заданным множителем
и показывает статистику на веб-дашборде.

## Статус

Проект на ранней стадии. Сейчас это один пакет на TypeScript, который получает сделки
кошельков через Polymarket Data API (`/v2/trades`) и выводит их в консоль.

Текущая структура:

```
src/
  index.ts                       точка входа
  types.ts                       типы ответов Data API (Trade, TradesResponse, Pagination)
  polymarket/dataApi/getTrades.ts запрос сделок по адресу кошелька
```

## План

1. Типы для ответа API и вынос запросов в отдельный модуль. Сделано.
2. Цикл слежения за лидером: опрос сделок раз в несколько секунд, вывод только новых.
3. База данных SQLite + Drizzle, таблица `leader_trades`, чтобы не копировать сделки повторно после перезапуска.
4. Адреса и ключи в `.env`.
5. Отправка зеркальных ордеров через `@polymarket/clob-client`.
6. Дашборд на Next.js, переезд на монорепо.

## Целевая архитектура

Монорепо на TypeScript (npm workspaces):

```
apps/bot/             Node-процесс: следит за лидерами, копирует сделки, пишет в БД
apps/web/             Next.js дашборд, читает ту же БД
packages/db/          Drizzle-схема, миграции, клиент (SQLite, позже Postgres)
packages/polymarket/  обёртки над Data API и CLOB-клиентом
```

Бот и дашборд общаются только через базу данных.

### Таблицы

| Таблица              | Назначение                                                      |
| -------------------- | --------------------------------------------------------------- |
| `leaders`            | адреса, за которыми следим, множитель размера, вкл/выкл         |
| `leader_trades`      | сделки лидеров из Data API, уникальный индекс по хешу транзакции |
| `orders`             | наши зеркальные ордера, статус, id в CLOB, ошибка               |
| `position_snapshots` | слепки позиций по времени для графиков PnL                      |

## Полезные ссылки

- Data API: https://docs.polymarket.com/developers/data-api/overview
- CLOB API и SDK: https://docs.polymarket.com/developers/CLOB/introduction
- TypeScript SDK: https://github.com/Polymarket/clob-client

## Запуск

Нужен Node.js 20+.

```bash
npm install
npm run start        # один запуск
npm run dev          # перезапуск при изменении файлов
npm run typecheck    # проверка типов без компиляции
```

Адреса кошельков пока заданы в `src/index.ts`, позже переедут в `.env`.

## Безопасность

Приватный ключ кошелька хранится только в `.env`, файл не попадает в git.
