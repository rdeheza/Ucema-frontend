import axios from 'axios';
import Constants from '../../Constants';

const getUserExams = async (userId, identification, program, orientation, token, userLogged) => {
  const { apibaseurl, api, exams } = Constants;

  const url = `${apibaseurl}${api}${exams}?identificacion=${identification}&programa=${program}&orientacion=${orientation}&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getUserExams =>", url);
  // console.log("DATA getUserExams =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getUserExams