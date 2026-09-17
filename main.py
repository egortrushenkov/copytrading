import requests
import json

users = {
    "my-address": "0xA2Ec08673F2C2a315D3CcAd1E697E96DE0a8c77f",
    "address-copy": "0x2d99e29c4f066ba32098c65e4c7454b277d94ca3"
    }

for i in range(0, len(users)):
    user = list(users.values())[i]
    request = requests.get(
        "https://data-api.polymarket.com/v2/positions",
        headers={
        "Accept": "application/json"
        },
        params={
        "user": user
        }
    )
    print(json.dumps(request.json(), indent=4, ensure_ascii=False))