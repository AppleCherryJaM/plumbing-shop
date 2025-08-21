import React from 'react'

import styles from "./filterBlock.module.css"

const filterBlock = ({filters}) => { //filters = list of categories and brands
	return (
		<div className={styles.mainBlock}>
			<ul className={styles.filtersList}>
				{filters.map(filter => {
					
				})}
			</ul>
		</div>
	)
}

export default filterBlock;