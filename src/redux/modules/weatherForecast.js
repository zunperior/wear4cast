import axios from 'axios';

// constants for actions
const FETCH_FORECAST  = 'redux-example/weatherForecast/FETCH_FORECAST';

// 5 day / 3 hour forecast API
const API_ID = '213cf721f68d330f62e76b8f4764a603';
const FORECAST_URL_WITH_API_ID = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_ID}`;

const initialState = {
  forecast: {}
};

// reducer is called once the data is available
export default function reducer(state = initialState, action){
  switch(action.type) {
    case FETCH_FORECAST:
      console.info('fethed forecast');
      return {
        ...state,
        forecast: action.payload.data
      };
    default:
      return state;
  }
}

// Action Creator (will be called in container)
export function fetchForecast(city, country){
  const units = 'units=metric'
  const requestUrl = `${FORECAST_URL_WITH_API_ID}&q=${city},${country}&${units}`;

  // this is promise that will be resolved by redux-promise into data once data is fetched
  const promiseRequest = axios.get(requestUrl);

  // return Action
  return {
    type: FETCH_FORECAST,
    payload: promiseRequest
  };
}
