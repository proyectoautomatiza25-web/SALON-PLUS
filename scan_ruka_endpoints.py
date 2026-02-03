import httpx
import asyncio

async def scan_endpoints(api_id, api_key):
    base_url = "https://www.ruka.ai/api/v1"
    headers = {
        "x-api-id": api_id,
        "x-api-key": api_key,
        "Content-Type": "application/json"
    }
    endpoints = [
        "/purchases",
        "/documents",
        "/invoices",
        "/expenses",
        "/gastos",
        "/compras",
        "/dte",
        "/dte_received"
    ]
    async with httpx.AsyncClient() as client:
        for ep in endpoints:
            url = base_url + ep
            try:
                response = await client.get(url, headers=headers, timeout=5.0)
                print(f"Endpoint {ep}: {response.status_code}")
                if response.status_code == 200:
                    print(f"  Bingo! Sample: {str(response.json())[:100]}")
            except Exception as e:
                print(f"Endpoint {ep} failed: {e}")

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    load_dotenv("backend-salon-plus/.env")
    asyncio.run(scan_endpoints(os.getenv("RUKA_API_ID"), os.getenv("RUKA_API_KEY")))
