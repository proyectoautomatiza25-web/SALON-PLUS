import subprocess
import sys

def check_command(command):
    try:
        subprocess.run([command, "--version"], capture_output=True, text=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def main():
    print("--- Verificación de Entorno ---")
    
    # Verificar gcloud
    if check_command("gcloud"):
        print("[OK] Google Cloud SDK (gcloud) está instalado.")
    else:
        print("[!] gcloud SDK NO encontrado.")

    # Verificar librerías de Python
    required_libs = ["google-auth-oauthlib", "google-api-python-client", "python-dotenv"]
    for lib in required_libs:
        try:
            __import__(lib.replace("-", "_"))
            print(f"[OK] Librería {lib} está instalada.")
        except ImportError:
            print(f"[X] Librería {lib} NO instalada.")

if __name__ == "__main__":
    main()
