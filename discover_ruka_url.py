import httpx
import asyncio
import os
from dotenv import load_dotenv

async def test_url(url, api_id, api_key):
    headers = {
        "x-api-id": api_id,
        "x-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            # First try a neutral endpoint like /me or /status or /purchases
            for ep in ["/me", "/purchases", "/status"]:
                test_url = url.rstrip("/") + ep
                print(f"Testing {test_url}...")
                try:
                    response = await client.get(test_url, headers=headers, timeout=5.0)
                    if response.status_code == 200:
                        content_type = response.headers.get("Content-Type", "")
                        if "application/json" in content_type:
                            print(f"  ✅ SUCCESS on {test_url}!")
                            print(f"  Data: {str(response.json())[:200]}")
                            return True
                        else:
                            print(f"  ⚠️ 200 but not JSON ({content_type})")
                    else:
                        print(f"  ❌ {response.status_code}")
                except Exception as e:
                    print(f"  Error on {ep}: {e}")
    except Exception as e:
        print(f"  Failed base {url}: {e}")
    return False

async def main():
    load_dotenv("backend-salon-plus/.env")
    api_id = os.getenv("RUKA_API_ID")
    api_key = os.getenv("RUKA_API_KEY")
    
    if not api_id or not api_key:
        print("Missing credentials in .env")
        return

    # Expanded list of possible Suplait/Ruka API bases
    possible_bases = [
        "https://api.ruka.ai/v1",
        "https://api.ruka.ai/api/v1",
        "https://app.ruka.ai/api/v1",
        "https://panel.ruka.ai/api/v1",
        "https://www.ruka.ai/api/v1",
        "https://ruka.ai/api/v1",
        "https://suplait.cl/api/v1",
        "https://api.suplait.cl/v1",
        "https://api.suplait.com/v1",
        "https://suplait.com/api/v1",
        "https://api.suplait.cl/api/v1",
        "https://backend.ruka.ai/api/v1"
    ]
    
    for base in possible_bases:
        if await test_url(base, api_id, api_key):
            print(f"\n🎯 FOUND IT: {base}")
            break
    else:
        print("\n😭 Could not find the API base URL.")

if __name__ == "__main__":
    asyncio.run(main())
