from datetime import datetime

class SenseHat:
    def get_temperature(self):
        return 25.0

    def get_humidity(self):
        return 50.0

    def get_pressure(self):
        return 1000.0

sense = SenseHat()

def get_sensor_data():
    """センサーデータを辞書で返す"""
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "temperature": round(sense.get_temperature(), 2),
        "humidity": round(sense.get_humidity(), 2),
        "pressure": round(sense.get_pressure(), 2),
    }
