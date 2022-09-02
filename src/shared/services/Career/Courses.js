
import axios from 'axios';
import Constants from '../../Constants';

const getUserCourses = async (userId, identification, program, orientation, year, descred, token, userLogged) => {
  const { apibaseurl, api, coursesdata } = Constants;

  const url = `${apibaseurl}${api}${coursesdata}?identificacion=${identification}&programa=${program}&orientacion=${orientation}&anio_lectivo=${year}&descred='${descred}'&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getUserCourses =>", url);
  // console.log("DATA getUserCourses =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export default getUserCourses