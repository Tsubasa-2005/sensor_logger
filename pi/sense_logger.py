from datetime import datetime, timezone
from sense_hat import SenseHat

sense = SenseHat()

def get_sensor_data():
    """センサーデータを辞書で返す"""
    try:
        temperature = sense.get_temperature()
        humidity = sense.get_humidity()
        pressure = sense.get_pressure()
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
