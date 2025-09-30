import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../main";

const ThemeToggle = observer(() => {
	const { store } = useContext(Context);

	return (
		<IconButton
			onClick={store.theme.toggleTheme}
			color="inherit"
			aria-label="Переключить тему"
		>
			{store.theme.isDark ? <Brightness7 /> : <Brightness4 />}
		</IconButton>
	);
});

export default ThemeToggle;
