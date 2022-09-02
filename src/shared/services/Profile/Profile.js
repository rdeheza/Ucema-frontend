import axios from 'axios';
import Constants from '../../Constants';

const getUserData = async ( userId, token, userLogged ) => {
  const { apibaseurl, api, userdata } = Constants;

  const url = `${apibaseurl}${api}${userdata}?_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getUserData =>", url);
  // console.log("DATA getUserData =>", `{ headers: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getUserData