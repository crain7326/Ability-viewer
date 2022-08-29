import axios, { AxiosRequestConfig } from "axios";
import userStorage from '../helper/localStorage';


const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
	if (userStorage.getToken() !== undefined) {
		config['headers'] = {
			Authorization: `Bearer ${userStorage.getToken()}`
		}
	}

	return config;
})

export default instance;