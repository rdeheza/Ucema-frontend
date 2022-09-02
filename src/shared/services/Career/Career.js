import axios from 'axios';
import Constants from '../../Constants';

const getUserCareers = async ( userId, token, userLogged ) => {
  const { apibaseurl, api, careerdata } = Constants;

  const url = `${apibaseurl}${api}${careerdata}?_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getUserCareers =>", url);
  // console.log("DATA getUserCareers =>", `{ headers: { 'content-type': 'application/json', 'authorization': ${token} }}`);

  return axios.get(url, { headers: { 
      'content-type': 'application/json',
      'authorization': `${token}`
  }})
    .then( response => {
      if (response.data.data) {
        return response.data.data
      } else {
        return false
      } 
    })

    .catch( (error) => {
      error
    });
}

export default getUserCareers