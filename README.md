# IoTデバイス講義リポジトリ

## 概要

このリポジトリは、大学のIoTデバイスに関する講義で使用されるコードと資料をまとめたものです。

## 講義のコンテキスト

大学のIoTデバイスに関する講義で使用されています。

## 使用されている技術

*   Python
*   Next.js
*   Supabase

## セットアップ手順

1.  リポジトリをクローンします。
2.  環境変数を設定します。
    *   SupabaseのAPIキー
    *   その他必要な環境変数
        *   `SUPABASE_URL`: SupabaseのURL
        *   `SUPABASE_KEY`: SupabaseのAPIキー
        *   `TABLE_NAME`: データを保存するテーブル名

3.  `make setup`コマンドを実行して、必要な依存関係をインストールします。このコマンドは、必要なPythonパッケージをインストールし、`run.sh`と`setup_cron.sh`に実行権限を与え、`setup_cron.sh`を実行します。
    ```bash
    make setup
    ```

## 使用方法

1.  Webアプリケーションを起動します。
    ```bash
    cd web
    npm run dev
    ```
2.  IoTデバイスからデータを送信します。`main.py`でデータ取得、Supabase送信を統合しているため、`sensor_logger.py`を直接実行する必要はありません。
    ```bash
    cd pi
    python main.py
    ```

## ライセンス情報

このプロジェクトはMITライセンスの下で公開されています。詳細については、[LICENSE](LICENSE)ファイルを参照してください。

## 貢献方法

1.  Issueを作成してバグや改善点を報告してください。
2.  Pull Requestを送信してコードを貢献してください。
