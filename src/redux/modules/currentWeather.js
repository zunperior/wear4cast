import axios from 'axios';
import WeatherForecastData from './weatherForecastData';
import WeatherForecastDataPoint from './weatherForecastDataPoint';

// constants for actions
const FETCH_CURRENTWEATHER  = 'redux-example/currentWeather/FETCH_CURRENTWEATHER';

// current weather API
//http://api.openweathermap.org/data/2.5/weather?q=London,us&units=metric&appid=213cf721f68d330f62e76b8f4764a603
const API_ID = '213cf721f68d330f62e76b8f4764a603';
const WEATHER_URL_WITH_API_ID = `http://api.openweathermap.org/data/2.5/weather?appid=${API_ID}`;

const initialState = {
  currentWeather: {}
};

function mapCurrentWeather(data){
  let dataPoint = new WeatherForecastDataPoint(data.dt, // Unix time
                                      data.main.temp, // temperature
                                      data.weather[0].id, // weather condition id
                                      data.weather[0].main); // weather description
  return dataPoint;
}

function mapData(data){
  let mappedData = new WeatherForecastData(data.name, data.sys.country, data.coord.lon, data.coord.lat);

  if (mappedData){
    mappedData.currWeather = mapCurrentWeather(data);
    // console.info('mapCurrentWeather successfully');
  }else{
    console.info('failed to map weatherData');
  }

  // console.info('mapped');
  return mappedData;
}

// reducer is called once the data is available
export default function reducer(state = initialState, action){
  switch(action.type) {
    case FETCH_CURRENTWEATHER:
      return {
        ...state,
        currentWeather: mapData(action.payload.data)
      };
    default:
      return state;
  }
}

// Action Creator (will be called in container)
export function fetchCurrentWeather(city, country){
  const units = 'units=metric';
  const requestUrl = `${WEATHER_URL_WITH_API_ID}&q=${city},${country}&${units}`;

  // this is promise that will be resolved by redux-promise into data once data is fetched
  const promiseRequest = axios.get(requestUrl);

  // return Action
  return {
    type: FETCH_CURRENTWEATHER,
    payload: promiseRequest
  };
}
