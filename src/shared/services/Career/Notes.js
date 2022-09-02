import axios from 'axios';
import Constants from '../../Constants';

const getUserNotes = async (userId, identification, program, orientation, token, userLogged) => {
  const { apibaseurl, api, notes } = Constants;

  const url = `${apibaseurl}${api}${notes}?identificacion=${identification}&programa=${program}&orientacion=${orientation}&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getUserNotes =>", url);
  // console.log("DATA getUserNotes =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getUserNotes