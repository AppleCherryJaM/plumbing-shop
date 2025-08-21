import { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import {observer} from "mobx-react-lite";

import { CatalogPage, MainPage, RegistrationPage, FavoritesPage } from './pages/pages';
import { Context } from './main';
import { Footer, Header, Layout } from './components/components';

import styles from './App.module.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

const App = observer(() => {
  const {store} = useContext(Context);

  const [isAuthOpened, setIsAuthOpened] = useState(false);

  useEffect( () => {
    if(localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);
  
  return (
    <Router>
      <Layout onAuthBtnClick={setIsAuthOpened}>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        <Route path="/catalog">
          <CatalogPage/>
        </Route>
        <Route path="/auth" exact>
          <RegistrationPage/>
        </Route>
        <Route path="/fav">
          <FavoritesPage/>
        </Route>
{/* 
        {isAuthOpened && <div className={styles.center}>
            <RegistrationPage />
          </div>}
        {!isAuthOpened && <MainPage/>} */}
      </Layout>
    </Router>
  )
});

export default App;
