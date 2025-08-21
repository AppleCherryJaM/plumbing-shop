import React, { useState } from 'react';
import styles from './RegistrationToggle.module.css';

const RegistrationToggle = ({onAuthButtonClick}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAuth = () => {
    setExpanded(!expanded);
  };

	const buttonHandler = () => {
		console.log("Button clicked");
		onAuthButtonClick(true);
	}

  return (
    <div className={`${expanded ? styles.expanded :  styles.unexpanded} ${styles.registrationWrapper}`}>
      <button
        className={styles.authButton}
				onClick={buttonHandler}
      >Войти</button>
      <button className={styles.toggleButton} onClick={toggleAuth} aria-label="Пошук">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30">
 					<circle cx="50" cy="30" r="20" fill="#666666" />
  				<path d="M20,100 a30,30 0 0,1 60,0" fill="#666666" />
				</svg>
      </button>
    </div>
  );
};

export default RegistrationToggle;
