.PHONY: test test_supabase test_sense_logger

test:
    pytest pi/test_supabase_client.py pi/test_sense_logger.py

test_supabase:
    pytest pi/test_supabase_client.py

test_sense_logger:
    pytest pi/test_sense_logger.py

setup:
    cd pi && pip install -r requirements.txt
    chmod +x run.sh
    chmod +x setup_cron.sh
    ./setup_cron.sh
