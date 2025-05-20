import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

def load_supabase_config():
    """環境変数から Supabase の設定を読み込む"""
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_API_KEY")
    table_name = os.environ.get("SUPABASE_TABLE_NAME")
    return supabase_url, supabase_key, table_name

def create_supabase_client():
    """Supabase クライアントを作成する"""
    supabase_url, supabase_key, _ = load_supabase_config()
    supabase: Client = create_client(supabase_url, supabase_key)
    return supabase

def insert_sensor_data(supabase: Client, data: dict, table_name: str):
    """センサーデータを Supabase に登録する"""
    try:
        result = supabase.table(table_name).insert(data).execute()
        return len(result.data)
    except Exception as e:
        print(f"Error inserting data: {e}")
        return None
