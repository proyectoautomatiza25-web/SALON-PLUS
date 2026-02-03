import httpx
import asyncio
import json

async def test_auth():
    url = "http://127.0.0.1:8000/api/ruka/test-connection"
    print(f"Calling {url}...")
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, timeout=30.0)
            print(f"Status: {response.status_code}")
            print(f"Response: {response.text}")
        except Exception as e:
            print(f"Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_auth())
