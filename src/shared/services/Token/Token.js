import axios from 'axios';
import Constants from '../../Constants'

const getToken = async ( userId, userName, cookie ) => {
  const { apibaseurl, api, getToken } = Constants
  
  const url = `${apibaseurl}${api}${getToken}?_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getToken =>", url);
  // console.log("DATA getToken =>", `{ headers: { 'content-type': 'application/json', 'userCookie': ${cookie} }}`);
  
  return axios.get(url, { headers: { 
      'content-type': 'application/json',
      'userCookie': `${cookie}`
  }})
    .then( (response) => {
      if (response.data.token) {
        return response.data.token
      } else {
        return false
      }
      
    })
    .catch( (error) => {return false
    });
}

export default getToken