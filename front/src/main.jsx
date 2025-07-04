import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store from './mobx/store.js'
import { createContext } from 'react';

const store = new Store();

export const Context = createContext({ 
  store
});

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{store}}>
    <App />
  </Context.Provider>
)
