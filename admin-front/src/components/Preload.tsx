// admin/src/components/UI/Preload.tsx
import { useEffect } from 'react';

// Предзагрузка компонентов при hover на меню
export const usePreload = () => {
  useEffect(() => {
    // Предзагружаем основные страницы сразу после загрузки приложения
    const preloadPages = async () => {
      await import('@pages/DashboardPage');
      await import('@pages/ProductsPage');
    };

    preloadPages();
  }, []);
};

// Хук для предзагрузки при hover
export const usePreloadOnHover = (pageComponent: () => Promise<unknown>) => {
  const preload = () => {
    pageComponent();
  };

  return { preload };
};