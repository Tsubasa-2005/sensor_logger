#!/bin/bash

# ログディレクトリ
LOG_DIR="/home/pi/sensor_logger/log"
mkdir -p "$LOG_DIR"

# タイムスタンプ付きログファイル
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$LOG_DIR/${TIMESTAMP}.log"

MAX_RETRIES=3
COUNT=0

while [ $COUNT -lt $MAX_RETRIES ]; do
  echo "Attempt $((COUNT+1))..." >> "$LOG_FILE"
  python3 /home/pi/sensor_logger/pi/main.py >> "$LOG_FILE" 2>&1 && break
  COUNT=$((COUNT+1))
  echo "Failed. Retrying in 5 seconds..." >> "$LOG_FILE"
  sleep 5
done