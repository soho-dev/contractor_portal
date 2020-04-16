import axios from 'axios';


class AxiosService {
  axiosInstance = null;

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.axiosInstance = axios.create({
      baseURL: ' http://ec2-13-233-20-140.ap-south-1.compute.amazonaws.com',
      timeout: 5000,
      headers:{"Content-Type":"application/json", "accept":" */*"}
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');

      if (token) {
        //config.headers.Authorization = `access-token = "${token}`;
        config.headers['access-token'] =  `${token}`;
      }

      return config;
    });
  }

  get bwmAxios() {
    return this.axiosInstance;
  }
}

export default new AxiosService();

