import moment from 'moment-timezone';
import coordinateTimezone from 'coordinate-tz';

export function getTimezone(longitude, latitude){
  return coordinateTimezone.calculate(latitude, longitude).timezone;
}

export function localDateTime(unixDateTime, timezone){
  const momentUnix = moment.unix(unixDateTime);
  const unixDateTimeObj = momentUnix.toDate();
  const localTime = moment(unixDateTimeObj).tz(timezone);
  return localTime;
}
