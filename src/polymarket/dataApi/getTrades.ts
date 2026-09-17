import { Trade } from "../../types.js";

export async function getTrades(address: string): Promise<Trade> {
    const url = new URL("https://data-api.polymarket.com/v2/trades");
    url.searchParams.set("user", address);
    return fetch(url).then((response) => response.json());
}