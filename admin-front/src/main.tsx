import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Store from './store/store.ts';

const store = new Store();

export const Context = createContext({
  store,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </StrictMode>,
)
