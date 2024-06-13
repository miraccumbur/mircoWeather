class weatherClass():
    def __init__(self,dt,pressure,humidity,wind,weather,temp):
        self.dt=dt
        self.pressure=pressure
        self.humidity=humidity       
        self.wind=wind
        self.weather=weather
        self.temp=temp

class currentWeather(weatherClass):
    def __init__(self, dt, pressure, humidity, wind, weather,temp):
        super().__init__(dt, pressure, humidity, wind, weather,temp)


class oneCallWeather(weatherClass):
    def __init__(self, dt, pressure, humidity, dewpoint, wind, weather,temp):
        super().__init__(dt, pressure, humidity, wind, weather,temp)
        self.dewpoint=dewpoint
