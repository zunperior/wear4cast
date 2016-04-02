import moment from 'moment-timezone';
import coordinateTimezone from 'coordinate-tz';


export default function localDateTime(longitude, latitude, unixDateTime){
  const timezone = coordinateTimezone.calculate(latitude, longitude).timezone;
  return moment(moment.unix(unixDateTime).ToDate()).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
}
