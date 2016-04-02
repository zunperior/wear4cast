export default class WeatherForecastDataPoint{
  constructor (datetimeUnix, temperature, weatherConditionId, weatherConditionDescr){
    this.datetimeUnix = datetimeUnix;
    this.temperature = temperature;
    this.weatherConditionId = weatherConditionId;
    this.weatherConditionDescr = weatherConditionDescr;
  }
}
