import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL}/user`;

const authApi = axios.create({
	withCredentials: true,
	baseURL: URL
});

authApi.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default authApi;