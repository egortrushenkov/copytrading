# Polymarket Copytrading Bot

Бот для копирования сделок выбранных трейдеров на [Polymarket](https://polymarket.com).
Следит за кошельками-лидерами, повторяет их сделки со своего кошелька с заданным множителем
и показывает статистику на веб-дашборде.

## Статус

Проект на ранней стадии. Сейчас есть только скрипт, который получает открытые позиции
кошельков через Polymarket Data API.

## Планируемая архитектура

Монорепо на TypeScript:

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

## Запуск (текущая версия)

```bash
pip install requests
python main.py
```

## Безопасность

Приватный ключ кошелька хранится только в `.env`, файл не попадает в git.
