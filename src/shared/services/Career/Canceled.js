import axios from 'axios';
import Constants from '../../Constants';

const getCanceledClasses = async ( userId, identificacion, programa, orientacion, anio, decred, token, userLogged ) => {
  const { apibaseurl, api, canceledClasses } = Constants;

  const url = `${apibaseurl}${api}${canceledClasses}?identificacion=${identificacion}&programa=${programa}&orientacion=${orientacion}&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getCanceledClasses =>", url);
  // console.log("DATA getCanceledClasses =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

  return axios.get(url, { headers: { 
    'content-type': 'application/json',
    'authorization': `${token}`
  }})
    .then( (response) => {
      if (response) {
        return response     
      } else {
        return false
      }
    })
    .catch( (error) => {
      return error
    });
}

export default getCanceledClasses