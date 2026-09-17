import type { AddressMap } from "./types.js";
import { getTrades } from "./polymarket/dataApi/getTrades.js";

const users: AddressMap = {
    "my-address": "0xA2Ec08673F2C2a315D3CcAd1E697E96DE0a8c77f",
    "address-copy": "0x2d99e29c4f066ba32098c65e4c7454b277d94ca3"
};

Object.values(users).map(async (address) => {
    const trades = await getTrades(address);
    console.log(`Trades for ${address}:`, trades);
});

for (const [user, address] of Object.entries(users)) {
    getTrades(address).then((trades) => {
        console.log(`Trades for ${user} (${address}):`, trades);
    }).catch((error) => {
        console.error(`Error fetching trades for ${user} (${address}):`, error);
    });
}