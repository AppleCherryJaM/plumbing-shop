import axios from "axios";
import { makeAutoObservable } from "mobx";
import UserController from "../controllers/user-controller";
import { themeStore } from "./theme-store";
import { LoginInput, RegistrationInput, User } from "@/types";
import errorHandler from "@/utils/error-handler";

const API_URL = import.meta.env.VITE_API_URL;

export default class Store {
	theme = themeStore;
	user = {};
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}

	setIsAuth(bool : boolean) {
		this.isAuth = bool;
	}

	setUser(user : User) {
		this.user = user;
	}

	async login({ email, password } : LoginInput) {
		try {
			const response = await UserController.login({ email, password });
			localStorage.setItem("token", response.data.accessToken);
			this.setIsAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			errorHandler(error, 'Login');
		}
	}

	async registration({ email, name, phone, password } : RegistrationInput) {
		let response;
		try {
			response = await UserController.registration({
				email,
				name,
				phone,
				password,
			});
			localStorage.setItem("token", response.data.accessToken);
			this.setIsAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			errorHandler(error, 'Registration');
		}
	}

	async logout() {
		try {
			const response = await UserController.logout();
			localStorage.removeItem("token");
			this.setIsAuth(false);
			this.setUser({} as User);
			console.log(response);
		} catch (error) {
			errorHandler(error, "Logout");
		}
	}

	async checkAuth() {
		try {
			const response = await axios.get(`${API_URL}/user/refresh`, {
				withCredentials: true,
			});
			console.log(response);
			localStorage.setItem("token", response.data.accessToken);
			this.setIsAuth(true);
			this.setUser(response.data.user);
		} catch (error) {
			errorHandler(error, "CheckAuth");
		}
	}
}
