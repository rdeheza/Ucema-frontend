import axios from 'axios';
import Constants from '../../Constants';

const performLogin = async (user, password) => {
  const { apibaseurl } = Constants;

  return axios.post(`${apibaseurl}/webzoom/login/process.php`, `user=${user}&pass=${password}&entrar=''` , 
  { header: { 
      'content-type': 'application/x-www-form-urlencoded'
  }})
    .then( (response) => {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

export default performLogin;