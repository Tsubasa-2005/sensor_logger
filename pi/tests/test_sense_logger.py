import pytest
from sensor.sense_logger import get_sensor_data

def test_get_sensor_data_structure():
    data = get_sensor_data()
    assert isinstance(data, dict)
    assert "timestamp" in data
    assert "temperature" in data
    assert "humidity" in data
    assert "pressure" in data

def test_get_sensor_data_types():
    data = get_sensor_data()
    assert isinstance(data["timestamp"], str)
    assert isinstance(data["temperature"], float)
    assert isinstance(data["humidity"], float)
    assert isinstance(data["pressure"], float)