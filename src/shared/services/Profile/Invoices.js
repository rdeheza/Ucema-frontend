import axios from 'axios';
import Constants from '../../Constants';

const getUserInvoices = async ( userId, token, userLogged ) => {
  const { apibaseurl, api, lastInvoices } = Constants;
  
  const url = `${apibaseurl}${api}${lastInvoices}?_dc=${new Date().getTime()}`

  // console.log("ENDPOINT getUserInvoices =>", url);
  // console.log("DATA getUserInvoices =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getUserInvoices