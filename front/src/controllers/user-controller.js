import authApi from "../http/authApi";

export default class UserController {
	static async login({ email, password }) {
		return authApi.post("/login", { email, password });
	}

	static async registration({ email, name, phone, password }) {
		return authApi.post("/registration", { email, name, phone, password });
	}

	static async logout() {
		return authApi.post("/logout");
	}
}
