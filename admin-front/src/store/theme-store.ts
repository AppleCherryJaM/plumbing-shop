import { makeAutoObservable } from "mobx";

class ThemeStore {
	isDark = false;

	constructor() {
		makeAutoObservable(this);

		// Восстановление темы из localStorage при инициализации
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			this.isDark = savedTheme === "dark";
		}
	}

	toggleTheme = () => {
		this.isDark = !this.isDark;

		// Сохранение в localStorage
		localStorage.setItem("theme", this.isDark ? "dark" : "light");

		// Применение темы к документу
		this.applyThemeToDocument();
	};

	setDarkTheme = (isDark: boolean) => {
		this.isDark = isDark;
		localStorage.setItem("theme", isDark ? "dark" : "light");
		this.applyThemeToDocument();
	};

	applyThemeToDocument = () => {
		if (this.isDark) {
			document.documentElement.classList.add("dark-theme");
			document.documentElement.classList.remove("light-theme");
		} else {
			document.documentElement.classList.add("light-theme");
			document.documentElement.classList.remove("dark-theme");
		}
	};
}

// Создаем экземпляр и сразу применяем тему
export const themeStore = new ThemeStore();
themeStore.applyThemeToDocument();
