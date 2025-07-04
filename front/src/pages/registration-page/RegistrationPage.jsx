import React, { useContext, useState } from "react";

import styles from "./RegistrationPage.module.css";

import UserController from "../../controllers/user-controller";
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
        <div className={styles.logo}>Logo</div>
        <h2>{isRegister ? "Register" : "Login"}</h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Email:
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

				{isRegister && <>
					<label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
				<label className={styles.label}>
          Phone:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
				</>
				}

        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.button}>
          {isRegister ? "Register" : "Login"}
        </button>
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