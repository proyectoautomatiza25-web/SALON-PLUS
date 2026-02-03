import httpx
import asyncio

async def scan_url(base_url):
    print(f"Testing {base_url}...")
    try:
        async with httpx.AsyncClient() as client:
            # We don't have the real headers for all, but let's check if the domain even exists
            response = await client.get(base_url, timeout=5.0)
            print(f"  Result for {base_url}: {response.status_code}")
            return True
    except httpx.ConnectError:
        print(f"  Domain not found: {base_url}")
    except Exception as e:
        print(f"  Error for {base_url}: {e}")
    return False

async def main():
    urls = [
        "https://api.ruka.ai/v1",
        "https://app.ruka.ai/api/v1",
        "https://ruka.ai/api/v1",
        "https://suplait.com/api/v1",
        "https://api.suplait.com/v1"
    ]
    for url in urls:
        await scan_url(url)

if __name__ == "__main__":
    asyncio.run(main())
