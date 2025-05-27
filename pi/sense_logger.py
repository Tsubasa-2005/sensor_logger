from datetime import datetime, timezone
import smbus2
import bme280

DEFAULT_PORT = 0x76

def get_sensor_data():
    """センサーデータを辞書で返す"""
    try:
        bus = smbus2.SMBus(1)
        calibration_params = bme280.load_calibration_params(bus, address=DEFAULT_PORT)
        data = bme280.sample(bus, address=DEFAULT_PORT, compensation_params=calibration_params)
        temperature = data.temperature
        humidity = data.humidity
        pressure = data.pressure
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "temperature": round(temperature, 2),
            "humidity": round(humidity, 2),
            "pressure": round(pressure, 2),
        }
    except Exception as e:
        print(f"Error reading sensor data: {e}")
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "temperature": None,
            "humidity": None,
            "pressure": None,
        }
