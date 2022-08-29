import axios, { AxiosRequestConfig } from "axios";
import userStorage from '../helper/localStorage';


const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use(
	config => {
		const token = userStorage.getToken();
		if (token) {
			config['headers'] = {
				Authorization: `Bearer ${token}`
			}
		}
		return config;
	},
	error => {
		Promise.reject(error)
	}
)

export default instance;