import {makeAutoObservable} from "mobx";
import UserController from "../controllers/user-controller";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default class Store {
	user = {};
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}

	setIsAuth(bool){
		this.isAuth = bool;
	}

	setUser(user){
		this.user = user;
	}

	async login({email, password}) {
		try {
			const response = await UserController.login({email, password});
			localStorage.setItem('token', response.data.accessToken);
			this.setIsAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			console.log(error.response);
		}
	}

	async registration({ email, name, phone, password }) {
		let response;
		try {
			response = await UserController.registration({ email, name, phone, password });
			localStorage.setItem('token', response.data.accessToken);
			this.setIsAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			console.log(error.response.data);
		}
	}

	async logout() {
		try {
			const response = await UserController.logout();
			localStorage.removeItem('token');
			this.setIsAuth(false);
			this.setUser({});
			console.log(response);
		} catch (error) {
			console.log(error.response.data);
		}
	}

	async checkAuth() {
		try {
			const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true});
			console.log(response);
			localStorage.setItem('token', response.data.accessToken);
			this.setIsAuth(true);
			this.setUser(response.data.user);

		} catch (error) {
			console.log(`error: ${error}`);
		}
	}
}