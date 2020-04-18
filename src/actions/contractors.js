
import axiosService from 'services/AxiosService';
const { bwmAxios } = axiosService;

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


export const checkLocationForApp = location => {
  return bwmAxios.post('/api/v1/location_services', {'address':location});
}
export const createApplication = application => {
  return bwmAxios.post('/api/v1/application_services', {"loan_application": application});
}
