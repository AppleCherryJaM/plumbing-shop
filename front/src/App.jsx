import { useContext, useEffect, useState } from 'react'
import {observer} from "mobx-react-lite";
import styles from './App.module.css';
import { RegistrationPage } from './pages/pages';
import { Context } from './main';
import { Footer, Header, Layout } from './components/components';

const App = observer(() => {
  const {store} = useContext(Context);

  useEffect( () => {
    if(localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  return (
    <Layout>
      <div className={styles.center}>
        <RegistrationPage />
      </div>
    </Layout>
  )
});

export default App;
