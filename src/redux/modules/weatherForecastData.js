export default class WeatherForecastData {
  constructor(city, country, longitude, latitude)
  {
    this.city = city;
    this.country = country;
    this.longitude = longitude;
    this.latitude = latitude;
    this.forecastDataPoints = [];
  }
}
