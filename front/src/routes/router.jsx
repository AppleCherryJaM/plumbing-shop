import { createBrowserRouter } from "react-router-dom";
import { 
  CatalogPage, MainPage, 
  RegistrationPage, FavoritesPage, 
  ProductPage, ComparisonPage 
} from './pages/pages';
import { Layout } from './components/components';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "catalog",
        element: <CatalogPage />
      },
      {
        path: "product/:productId",
        element: <ProductPage />
      },
      {
        path: "comparison",
        element: <ComparisonPage />
      },
      {
        path: "fav",
        element: <FavoritesPage /> // Пока без защиты
      }
    ]
  },
  {
    path: "/auth",
    element: <RegistrationPage />
  }
]);