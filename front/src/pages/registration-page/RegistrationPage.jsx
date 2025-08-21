import React, { useContext, useState } from "react";

import styles from "./RegistrationPage.module.css";

import UserController from "../../controllers/user-controller";
import logo from '/images/vas-blue-logo.png'; 
import { Context } from "../../main";
import { observer } from "mobx-react-lite";

const URL = import.meta.env.VITE_API_URL;

const RegistrationPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

  const {store} = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      store.registration({email, phone, name, password});
    } else {
			store.login({email, password});
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <img className={styles.logo} src={logo} alt="Logo"/>
        <div className={styles.title}>{isRegister ? "Register" : "Login"}</div>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputForms}>
          <div className={styles.coolinput}>
            <label for="input" className={styles.text}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              placeholder="Enter email..."
             onChange={(e) => setEmail(e.target.value)}
             required
            />
          </div>

          {isRegister && <>
            <div className={styles.coolinput}>
              <label for="input" className={styles.text}>Name:</label>
              <input
                className={styles.input}
                type="text"
                value={name}
                placeholder="Enter name..."
               onChange={(e) => setName(e.target.value)}
               required
              />
            </div>
          <div className={styles.coolinput}>
              <label for="input" className={styles.text}>Phone:</label>
              <input
                className={styles.input}
                type="tel"
                value={phone}
                placeholder="Enter phone..."
               onChange={(e) => setPhone(e.target.value)}
               required
              />
            </div>
          </>
          }

          <div className={styles.coolinput}>
            <label for="input" className={styles.text}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              placeholder="Enter password..."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.center}>
          <button type="submit" className={styles.button}>
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>

      <div className={styles.switchText}>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className={styles.switchButton}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </div>

      <footer className={styles.footer}>
        Contact: info@plumbingstore.com | Tel: +1 123 456 7890
      </footer>
    </div>
  );
})

export default RegistrationPage;