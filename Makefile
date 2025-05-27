.PHONY: test test_supabase test_sense_logger

test:
	pytest pi/test_supabase_client.py pi/test_sense_logger.py

test_supabase:
	pytest pi/test_supabase_client.py

test_sense_logger:
	pytest pi/test_sense_logger.py
