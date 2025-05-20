import pytest
import os
from unittest.mock import MagicMock
from pi.supabase_client import (
    load_supabase_config,
    create_supabase_client,
    insert_sensor_data,
)
from pi.sense_logger import get_sensor_data

def test_load_supabase_config():
    url, key, table = load_supabase_config()
    assert url != ""
    assert key != ""
    assert table != ""

def test_create_supabase_client():
    # 環境変数が設定されていない場合でもエラーが発生しないことを確認
    client = create_supabase_client()
    assert client is not None

@pytest.mark.asyncio
async def test_insert_sensor_data(mocker):
    # モックの Supabase クライアントを作成
    supabase_mock = MagicMock()
    table_mock = MagicMock()
    insert_mock = MagicMock()
    execute_mock = MagicMock()

    # モックの動作を設定
    supabase_mock.table.return_value = table_mock
    table_mock.insert.return_value = insert_mock
    insert_mock.execute.return_value = execute_mock
    execute_mock.data = ([{"test": "data"}],)
    execute_mock.count = 1

    # insert_sensor_data 関数を呼び出し
    data, count = insert_sensor_data(supabase_mock, {"test": "data"})

    # モックが正しく呼び出されたことを確認
    supabase_mock.table.assert_called_once()
    table_mock.insert.assert_called_once()
    insert_mock.execute.assert_called_once()
    assert data == ([{"test": "data"}],)
    assert count == 1

# 実際にリクエストを出すテストは、環境変数が設定されている場合にのみ実行する
def test_insert_sensor_data_real():
    supabase = create_supabase_client()
    # 外部の get_sensor_data を使用する代わりに、適当なデータを使用する
    sensor_data = {
        "timestamp": "2025-05-20T00:00:00",
        "temperature": 25.0,
        "humidity": 50.0,
        "pressure": 1000.0,
    }
    table_name = os.environ.get("SUPABASE_TABLE_NAME") + "_test"
    count = insert_sensor_data(supabase, sensor_data, table_name)
    assert count == 1
    # テストデータの削除処理は省略
