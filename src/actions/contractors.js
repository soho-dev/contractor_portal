
import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
import { deleteResource } from './index';
import applicationsMock from './../helpers/applications_mock';
const { bwmAxios } = axiosService;

const delay =  function(time, value) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, value), time)
  });
}
export const verifyContractorOwner = (contractorId) => {
  return bwmAxios.get(`/contractors/${contractorId}/verify-user`);
}

export const fetchContractors = (location) => dispatch => {
  const query = location ? `/contractors?city=${location}` : '/contractors';
  dispatch({type: 'REQUEST_DATA', resource: 'contractors'});
  bwmAxios.get(query)
    .then(res => {
      const contractors = res.data; 
      dispatch({type: 'REQUEST_DATA_COMPLETE', resource: 'contractors'});
      dispatch({
        type: 'FETCH_CONTRACTORS',
        contractors
      });
    }) 
}

export const fetchApplications = () => dispatch => {
  dispatch({type: 'REQUEST_DATA', resource: 'manage-contractors'});
  return bwmAxios.get('/api/v1/application_services')
    .then(res => res.data)
    .then(applications => {
      dispatch({
        type: 'REQUEST_DATA_COMPLETE',
        data: applications,
        resource: 'manage-contractors'
      })
    })
}

export const fetchUserContractors = () => dispatch => {
  dispatch({type: 'REQUEST_DATA', resource: 'manage-contractors'});
  return delay(2000, applicationsMock)
              .then(res => {console.log(res); return res;})
              .then(contractors => {
                dispatch({
                  type: 'REQUEST_DATA_COMPLETE',
                  data: contractors,
                  resource: 'manage-contractors'
                })
              });
  // return bwmAxios.get('/contractors/me')
  //   .then(res => res.data)
  //   .then(contractors => {
  //     dispatch({
  //       type: 'REQUEST_DATA_COMPLETE',
  //       data: contractors,
  //       resource: 'manage-contractors'
  //     })
  //   })
}


export const fetchContractorById = contractorId => async dispatch => { 
  dispatch({type: 'REQUEST_DATA', resource: 'contractor'});
  const res = await bwmAxios.get(`/contractors/${contractorId}`)
  dispatch({type: 'REQUEST_DATA_COMPLETE', resource: 'contractor'});
  dispatch({
    type: 'FETCH_CONTRACTOR_BY_ID',
    contractor: res.data
  });
}

export const checkAppEligibility = contractor => {
  return bwmAxios.post('/contractors', contractor);
}

export const checkLocationForApp = location => {
  console.log(location);
  //return delay(3000,{'success':true});
  return bwmAxios.post('/api/v1/location_services', {'address':location});
}
export const createApplication = application => {
  return bwmAxios.post('/api/v1/application_services', {"loan_application": application});
}
export const updateContractor = (id, contractorData) => dispatch => {
  return bwmAxios.patch(`/contractors/${id}`, contractorData)
    .then(res => res.data)
    .then(updatedContractor => 
      dispatch({
        type: 'UPDATE_CONTRACTOR_SUCCESS',
        contractor: updatedContractor
      })
    )
    .catch(error => Promise.reject(extractApiErrors(error.response || [])))
}

export const deleteContractor = contractorId => dispatch => {
  return dispatch(
    deleteResource(
      { url: `/contractors/${contractorId}`, 
        resource: 'manage-contractors'}))
}