import httpx
import asyncio
import os
from dotenv import load_dotenv

async def test_endpoint(url, api_id, api_key):
    headers = {
        "x-api-id": api_id,
        "x-api-key": api_key,
        "Accept": "application/json"
    }
    print(f"Testing {url}...")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, timeout=10.0)
            print(f"  Status: {response.status_code}")
            content_type = response.headers.get("Content-Type", "")
            print(f"  Content-Type: {content_type}")
            if "application/json" in content_type:
                try:
                    data = response.json()
                    print(f"  Data: {str(data)[:200]}...")
                except:
                    print(f"  Could not parse JSON")
            else:
                print(f"  Body (partial): {response.text[:100]}...")
    except Exception as e:
        print(f"  Failed: {e}")

async def main():
    load_dotenv("backend-salon-plus/.env")
    api_id = os.getenv("RUKA_API_ID")
    api_key = os.getenv("RUKA_API_KEY")
    
    # Try different base URLs and endpoints
    bases = [
        "https://www.ruka.ai/api/v1",
        "https://ruka.ai/api/v1",
        "https://suplait.cl/api/v1"
    ]
    endpoints = ["/purchases", "/documents", "/me", "/expenses"]
    
    for base in bases:
        for ep in endpoints:
            await test_endpoint(base + ep, api_id, api_key)

if __name__ == "__main__":
    asyncio.run(main())
