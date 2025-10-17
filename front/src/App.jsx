import CssBaseline from "@mui/material/CssBaseline";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Context } from "./main";
import { QueryProvider } from "./providers/QueryProvider";
import { router } from "./routes/router";

const App = observer(() => {
	const { store } = useContext(Context);

	// const [isAuthOpened, setIsAuthOpened] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.checkAuth();
		}
	}, [store]);

	return (
		<CssBaseline>
			<QueryProvider>
				<RouterProvider router={router} />
			</QueryProvider>
		</CssBaseline>
	);
});

export default App;
