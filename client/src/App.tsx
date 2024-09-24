import { RouterProvider } from './components/RouterProvider';
import { RootLayout, Main as MainPage, Test as TestPage } from './pages/pages';
import React from 'react';
import { AppRoute } from './common/common';

const App: React.FC = () => {
  return (
    <RouterProvider
      routes={[
        {
          path: AppRoute.ROOT,
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <MainPage />,
            },
            {
              path: AppRoute.TEST,
              element: <TestPage />,
            },
            {
              path: AppRoute.ANY,
            },
          ],
        },
      ]}
    />
  );
};

export default App;
