import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { router } from './routes/router';
import { usePreload } from '@components/Preload';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 минут
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Компонент для инициализации предзагрузки
const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  usePreload(); // Инициализация предзагрузки
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppInitializer>
          <RouterProvider router={router} />
        </AppInitializer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;