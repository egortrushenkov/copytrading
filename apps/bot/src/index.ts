
const users = {
    "my-address": "0xA2Ec08673F2C2a315D3CcAd1E697E96DE0a8c77f",
    "address-copy": "0x2d99e29c4f066ba32098c65e4c7454b277d94ca3"
};

for (let i = 0; i < Object.keys(users).length; i++) {
    const user = Object.values(users)[i];
    const request = fetch(
        "https://data-api.polymarket.com/v2/positions",
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            params: { "user": user}
        }
    );
    request.then(response => response.json()).then(data => console.log(JSON.stringify(data, null, 4)));