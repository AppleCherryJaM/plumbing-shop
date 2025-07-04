import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL}/product`;

const productApi = axios.create({
	withCredentials: true,
	baseURL: URL
});

export default productApi;