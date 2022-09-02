import axios from 'axios';
import Constants from '../../Constants';

const getClassroomsList = async ( fdesde, userId, token, userLogged ) => {
  const { apibaseurl, api, classroomList } = Constants;

  const url = `${apibaseurl}${api}${classroomList}?fdesde='${fdesde}'&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getClassroomsList =>", url);
  // console.log("DATA getClassroomsList =>", `{ headers: { 'content-type': 'application/json', 'authorization': ${token} }}`);

  return axios.get(url, { headers: { 
    'content-type': 'application/json',
    'authorization': `${token}`
  }})
    .then( (response) => {

      console.log("getClassroomsList", response)

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

export default getClassroomsList