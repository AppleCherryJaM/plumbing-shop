import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@components/components";
import {
	CatalogPage,
	ComparisonPage,
	FavoritesPage,
	MainPage,
	ProductPage,
	RegistrationPage,
} from "../pages/pages";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: "catalog",
				element: <CatalogPage />,
			},
			{
				path: "product/:productId",
				element: <ProductPage />,
			},
			{
				path: "comparison",
				element: <ComparisonPage />,
			},
			{
				path: "fav",
				element: <FavoritesPage />, // Пока без защиты
			},
		],
	},
	{
		path: "/auth",
		element: <RegistrationPage />,
	},
]);
