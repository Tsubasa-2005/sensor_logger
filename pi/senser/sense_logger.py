from sense_hat import SenseHat
from datetime import datetime

sense = SenseHat()

def get_sensor_data():
    """センサーデータを辞書で返す"""
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "temperature": round(sense.get_temperature(), 2),
        "humidity": round(sense.get_humidity(), 2),
        "pressure": round(sense.get_pressure(), 2),
    }