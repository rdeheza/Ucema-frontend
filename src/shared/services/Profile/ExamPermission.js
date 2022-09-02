import axios from 'axios';
import Constants from '../../Constants';

const getExamPermission = async ( userId, identificacion, programa, orientacion, token, userLogged ) => {
  const { apibaseurl, api, examPermission } = Constants;

  const url = `${apibaseurl}${api}${examPermission}?identificacion=${identificacion}&programa=${programa}&orientacion=${orientacion}&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getExamPermission =>", url);
  // console.log("DATA getExamPermission =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`); 

  return axios.get(url, { headers: { 
    'content-type': 'application/json',
    'authorization': `${token}`
  }})
    .then( response => {
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

export default getExamPermission