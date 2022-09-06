import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import userStorage from '../helper/localStorage';


const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = userStorage.getToken();
		if (token) {
			config['headers'] = {
				Authorization: `Bearer ${token}`
			}
		}
		return config;
	}
)

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		return Promise.resolve(response.data)
	},
	(error: AxiosError) => {
		
		if (!error.response) {
			return;
		}
    // store 통해서 오류 발생 UI 업데이트 
    if (error.response.status === 401) {
      // 접근 권한이 없습니다.
    }
    if (error.response.status === 500) {
      // 서버 문제가 발생했습니다.
    }
    // 만약 위 상태 코드로 에러 처리가 불가능한 경우 reject 시키기 (이러면 화면에서 에러 처리 해야함)
    Promise.reject(error);
	}
)

export default instance;