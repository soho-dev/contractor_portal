import React from 'react';
import { connect } from 'react-redux';
import { loginUser, userAuthenticated } from 'actions';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const { createContext, useContext } = React;

const AuthContext = createContext(null);

const AuthBaseProvider = ({children, dispatch}) => {

  const checkAuthState = () => {
    const decodedToken = decodeToken(getToken());
    if (decodedToken && moment().isBefore(getExpiration(decodedToken))) {
      dispatch(userAuthenticated(decodedToken))
    }
  }

  const isAuthenticated = () => {
    const decodedToken = decodeToken(getToken());
    return decodedToken && isTokenValid(decodedToken)
  }

  const isTokenValid = (decodedToken) => {
    return decodeToken && moment().isBefore(getExpiration(decodedToken));
  }

  const getExpiration = (decodedToken) => {
    return moment.unix(decodedToken.exp);
  }

  const getToken = () => {
    return localStorage.getItem('access_token');
  }

  const decodeToken = token => {
    return jwt.decode(token);
  }

  const signOut = () => {
    localStorage.removeItem('access_token');
    dispatch({type: 'USER_SIGNED_OUT'});
  }

  const signIn = (loginData) => {
    return loginUser(loginData)
      .then(res => {
        if(res.access_token){
          localStorage.setItem('access_token', res.access_token);
          const decodedToken = decodeToken(res.access_token);
          dispatch(userAuthenticated(decodedToken))
          return res;
        }else{
          return {error:{title:'authFailed', detail : res.message}};
        }
      })
  }

  const authApi = {
    signIn,
    checkAuthState,
    signOut,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = connect()(AuthBaseProvider);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const withAuth = Component => props => (
  <AuthContext.Consumer>
    {authApi => <Component {...props} auth={authApi} /> }
  </AuthContext.Consumer>
)
  

