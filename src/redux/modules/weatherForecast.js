import axios from 'axios';
import WeatherForecastData from './weatherForecastData';
import WeatherForecastDataPoint from './weatherForecastDataPoint';

// constants for actions
const FETCH_FORECAST  = 'redux-example/weatherForecast/FETCH_FORECAST';




// 5 day / 3 hour forecast API
//http://api.openweathermap.org/data/2.5/forecast?q=London,us&units=metric&appid=213cf721f68d330f62e76b8f4764a603
const API_ID = '213cf721f68d330f62e76b8f4764a603';
const FORECAST_URL_WITH_API_ID = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_ID}`;

const initialState = {
  forecast: {}
};

function mapWeatherDataPoints(forecasts){
  var mappedDataPoints = forecasts.map(forecastPoint=>{
    return new WeatherForecastDataPoint(forecastPoint.dt, // Unix time
                                        forecastPoint.main.temp, // temperature
                                        forecastPoint.weather[0].id, // weather condition id
                                        forecastPoint.weather[0].main); // weather description
  });

  return mappedDataPoints;
}



function mapData(data){
  var mappedData = new WeatherForecastData(data.city.name, data.city.country, data.city.coord.lon, data.city.coord.lat);

  if (mappedData){
    var mappedDataPoints = mapWeatherDataPoints(data.list);

    if (mappedDataPoints && mappedDataPoints.length > 0 ){
      mappedData.forecastDataPoints = mappedDataPoints.slice();
    }else{
      console.info('failed to map data points');
    }
  }else{
    console.info('failed to map weatherData');
  }

  return mappedData;
}
// reducer is called once the data is available
export default function reducer(state = initialState, action){
  switch(action.type) {
    case FETCH_FORECAST:
      var mappedData =  mapData(action.payload.data);
      return {
        ...state,
        forecast: mappedData
      };
    default:
      return state;
  }
}

// Action Creator (will be called in container)
export function fetchForecast(city, country){
  const units = 'units=metric';
  const requestUrl = `${FORECAST_URL_WITH_API_ID}&q=${city},${country}&${units}`;

  // this is promise that will be resolved by redux-promise into data once data is fetched
  const promiseRequest = axios.get(requestUrl);

  // return Action
  return {
    type: FETCH_FORECAST,
    payload: promiseRequest
  };
}
