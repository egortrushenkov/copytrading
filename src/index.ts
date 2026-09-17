
interface AddressMap {
    [key: string]: string;
}

const users: AddressMap = {
    "my-address": "0xA2Ec08673F2C2a315D3CcAd1E697E96DE0a8c77f",
    "address-copy": "0x2d99e29c4f066ba32098c65e4c7454b277d94ca3"
};

Object.values(users).map(async (user) => {
    const url = new URL("https://data-api.polymarket.com/v2/positions");
    url.searchParams.set("user", user);
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 4));
});