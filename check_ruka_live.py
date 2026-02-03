import httpx
import asyncio
import json

async def check_ruka():
    url = "http://127.0.0.1:8000/api/ruka/test-purchases"
    params = {
        "fecha_desde": "2024-01-01",
        "fecha_hasta": "2026-02-03"
    }
    print(f"Calling {url}...")
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params, timeout=30.0)
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print("--- RUKA DATA RECEIVED ---")
                print(json.dumps(data, indent=2))
            else:
                print(f"Error: {response.text}")
        except Exception as e:
            print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(check_ruka())
