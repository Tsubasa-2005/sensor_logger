#!/bin/bash

# 定義：実行したいcronの行
CRON_LINE="*/5 * * * * /home/pi/sensor_logger/run.sh"

# 現在のcrontabに追記（重複回避）
( crontab -l 2>/dev/null; echo "$CRON_LINE" ) | sort | uniq | crontab -

echo "Cron job added:"
echo "$CRON_LINE"
