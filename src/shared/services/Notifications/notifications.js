import axios from 'axios';
import Constants from '../../Constants';

// PUSH NOTIFICATIONS
// GET PUSH MESSAGES
export const getPushMessages = async ( userId, token, userLogged) => {
  const { apibaseurl, api, getPushMessages } = Constants;

  const url = `${apibaseurl}${api}${getPushMessages}?_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getPushMessages =>", url);
  // console.log("DATA getPushMessages =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

// GET PUSH MESSAGES
export const getPushMessagesTypes = async ( id, token, userLogged, userId ) => {
  const { apibaseurl, api, getPushMessagesTypes } = Constants;

  const url = `${apibaseurl}${api}${getPushMessagesTypes}?id=${id}&_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getPushMessagesTypes =>", url);
  // console.log("DATA getPushMessagesTypes =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

export const updatePushMessages = async ( id, token) => {
  const { apibaseurl, api, updatePushMessages } = Constants;

  const url = `${apibaseurl}${api}${updatePushMessages}`;

  // console.log("ENDPOINT savePushToken =>", url);
  // console.log("DATA savePushToken =>", `{ header: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': ${token} }}`);
  // console.log("DATA savePushToken =>", `idMSG=${id}&update=true`)

  return axios.post(url, `idMSG=${id}&update=true`, { headers: { 
    'content-type': 'application/x-www-form-urlencoded',
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

// PUSH TOKEN
// OBTAIN PUSH TOKEN
export const getPushToken = async ( userId, token, userLogged ) => {
  const { apibaseurl, api, getPushToken } = Constants;

  const url = `${apibaseurl}${api}${getPushToken}?_dc=${new Date().getTime()}`;

  // console.log("ENDPOINT getPushToken =>", url);
  // console.log("DATA getPushToken =>", `{ header: { 'content-type': 'application/json', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);

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

// SAVE PUSH TOKEN
export const savePushToken = async ( userId, pushToken, token, userLogged ) => {
  const { apibaseurl, api, getPushToken } = Constants;

  const url = `${apibaseurl}${api}${getPushToken}`;

  // console.log("ENDPOINT savePushToken =>", url);
  // console.log("DATA savePushToken =>", `{ header: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': ${token}, 'i': ${userId}, 'u': ${userLogged} }}`);
  // console.log("DATA savePushToken =>", `id_persona=${userId}&token=${pushToken}`)

  return axios.post(url, `id_persona=${userId}&token=${pushToken}`, { headers: { 
    'content-type': 'application/x-www-form-urlencoded',
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

