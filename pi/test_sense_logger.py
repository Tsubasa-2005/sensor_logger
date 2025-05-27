import pytest
from pi.sense_logger import get_sensor_data

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
    assert isinstance(data["temperature"], (float, type(None)))
    assert isinstance(data["humidity"], (float, type(None)))
    assert isinstance(data["pressure"], (float, type(None)))

def test_get_sensor_data_error():
    data = get_sensor_data()
    if data["temperature"] is None or data["humidity"] is None or data["pressure"] is None:
        pytest.fail("Sensor data is None, indicating a sensor error.")
