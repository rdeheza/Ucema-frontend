import axios from 'axios';
import Constants from '../../Constants';

const getTutorName = async ( userId, token, userLogged ) => {
  const { apibaseurl, api, tutorName } = Constants;

  const url = `${apibaseurl}${api}${tutorName}?_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getTutorName =>", url);
  // console.log("DATA getTutorName =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getTutorName