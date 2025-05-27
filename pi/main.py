import time
import os
from dotenv import load_dotenv
from sense_logger import get_sensor_data
from supabase_client import create_supabase_client, insert_sensor_data, load_supabase_config

load_dotenv()

def main():
    supabase_url, supabase_key, table_name = load_supabase_config()

    if not supabase_url or not supabase_key or not table_name:
        print("Supabaseの設定が不足しています。環境変数を確認してください。")
        return

    supabase = create_supabase_client()

    data = get_sensor_data()
    if data:
        row_count = insert_sensor_data(supabase, data, table_name)
        if row_count:
            print(f"{row_count}件のデータを登録しました。")
        else:
            print("データの登録に失敗しました。")
    else:
        print("センサーデータの取得に失敗しました。")

if __name__ == "__main__":
    main()
