import authApi from "../http/authApi";

import { LoginInput, RegistrationInput } from "@/types";

export default class UserController {
	static async login({ email, password } : LoginInput) {
		const response = authApi.post("/login", { email, password });
		const test = await response;
		console.log("Response: ", test);
		return response;
	}

	static async registration({ email, name, phone, password } : RegistrationInput) {
		return authApi.post("/registration", { email, name, phone, password });
	}

	static async logout() {
		return authApi.post("/logout");
	}
}
