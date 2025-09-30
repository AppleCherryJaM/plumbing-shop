import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}/order`;

const orderApi = axios.create({
	withCredentials: true,
	baseURL: URL,
});

export default orderApi;
