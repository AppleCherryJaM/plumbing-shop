import {
  RouterProvider as LibraryRouterProvider,
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';

type Props = {
  routes: Pick<RouteObject, 'path' | 'children' | 'element'>[];
};

const RouterProvider = ({ routes }: Props) => {
  const router = createBrowserRouter(routes);

  return <LibraryRouterProvider router={router} />;
};

export { RouterProvider };
