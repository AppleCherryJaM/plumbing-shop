import React from 'react'

import { Carousel } from '../../components/components';

import mockProducts from '../../mock-data/mockData';
import styles from './MainPage.module.css'

const content = {
	data: [
		{
			id: 1,
			image: 'https://media.istockphoto.com/id/825383494/photo/business-man-pushing-large-stone-up-to-hill-business-heavy-tasks-and-problems-concept.jpg?s=612x612&w=0&k=20&c=wtqvbQ6OIHitRVDPTtoT_1HKUAOgyqa7YzzTMXqGRaQ=',
			link: `/category/1`
		},
		{
			id: 2,
			image: 'https://i.pinimg.com/236x/d1/d4/63/d1d46381d3c104837c94190352b4186b.jpg',
			link: `/category/2`
		},
		{
			id: 3,
			image: 'https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/3b89/live/60e7ae50-03dc-11f0-a387-437e2fb661fc.jpg',
			link: `/category/3`
		},
	]
}

const MainPage = () => {
	
	// тут нужно вызывать топ-продаж и рекоммендуемые товары 
	return (
		<main className={styles.mainPage}>
			<div className={styles.bannerBlock}>
				<Carousel type={"banner"} content={content}/>
			</div>
			<div className={styles.carouselBlock}>
				<div className={styles.carousel}>
					<Carousel 
  					content={mockProducts}
					/>
				</div>
			</div>
		</main>
	)
}

export default MainPage;