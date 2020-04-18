import axiosService from 'services/AxiosService';
const { bwmAxios } = axiosService;

export const loginUser = (loginData) => {
  return bwmAxios
    .post('/users/sign_in', {"user":loginData})
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || ''
  }
}