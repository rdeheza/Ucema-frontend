
import axios from 'axios';
import Constants from '../../Constants';

const getDayClasses = async ( userId, fdesde, fhasta, token, userLogged ) => {
  const { apibaseurl, api, dayclasses } = Constants;

  const url = `${apibaseurl}${api}${dayclasses}?fdesde='${fdesde}'&fhasta='${fhasta}'&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getDayClasses =>", url);
  // console.log("DATA getDayClasses =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getDayClasses