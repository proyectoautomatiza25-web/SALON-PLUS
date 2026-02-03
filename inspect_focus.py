import sqlite3
import os

def inspect_db(path):
    print(f"\n--- Checking {path} ---")
    if not os.path.exists(path):
        print("File does not exist")
        return
    try:
        conn = sqlite3.connect(path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables: {tables}")
        for table in tables:
            table_name = table[0]
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            print(f"  Table '{table_name}' has {len(columns)} columns")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

inspect_db('c:/Users/Lenovo/clod database/backend-salon-plus/focus.db')
