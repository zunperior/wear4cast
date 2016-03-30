import moment from 'moment-timezone';
import coordinateTimezone from 'coordinate-tz';

export function getTimezoneFromCoordinates(longitude, latitude)
{
  return coordinateTimezone.calculate(latitude, longitude).timezone;
}

export function localDateTime(longitude, latitude, unixDateTime){
  const timezone = getTimezoneFromCoordinates(longitude, latitude);
  return moment(moment.unix(unixDateTime).ToDate()).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
}
