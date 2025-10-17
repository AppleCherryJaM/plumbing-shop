import { createRoot } from "react-dom/client";
import "./index.css";
import { createContext } from "react";
import App from "./App.jsx";
import Store from "./stores/store.js";

const store = new Store();

export const Context = createContext({
	store,
});

createRoot(document.getElementById("root")).render(
	<Context.Provider value={{ store }}>
		<App />
	</Context.Provider>,
);
