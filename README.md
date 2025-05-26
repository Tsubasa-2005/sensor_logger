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
2.  必要な依存関係をインストールします。
    ```bash
    cd web
    npm install
    cd ../pi
    pip install -r requirements.txt
    ```
3.  環境変数を設定します。
    *   SupabaseのAPIキー
    *   その他必要な環境変数

## 使用方法

1.  Webアプリケーションを起動します。
    ```bash
    cd web
    npm run dev
    ```
2.  IoTデバイスからデータを送信します。
    ```bash
    cd pi
    python sense_logger.py
    ```

## ライセンス情報

このプロジェクトはMITライセンスの下で公開されています。詳細については、[LICENSE](LICENSE)ファイルを参照してください。

## 貢献方法

1.  Issueを作成してバグや改善点を報告してください。
2.  Pull Requestを送信してコードを貢献してください。
