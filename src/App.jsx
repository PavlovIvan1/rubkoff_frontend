// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './App.css'
// import { Card } from './components/card'
// import { getHouseAIRecommendations } from './services/api/apiServices'

// export function App() {
// 	const [houses, setHouses] = useState([])
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const data = await getHouseAIRecommendations()
// 				setHouses(data.recommendations)
// 			} catch (err) {
// 				console.error('Ошибка при получении рекомендаций:', err)
// 			}
// 		}

// 		fetchData()
// 	}, [])

// 	const handleCardClick = house => {
// 		navigate('/house-info', { state: { id: house.id } })
// 	}

// 	return (
// 		<>
// 			<main>
// 				<div className='top'>
// 					<img src='/logo.png' alt='' className='logo' />
// 					<h3>
// 						Мы подобрали для вас
// 						<br />
// 						<span>{houses.length} варианта</span> дома мечты:
// 					</h3>
// 				</div>

// 				{houses.map((house, index) => (
// 					<div key={index} onClick={() => handleCardClick(house)}>
// 						<Card house={house} />
// 					</div>
// 				))}
// 			</main>

// 			<div className='fixed-button-container'>
// 				<button className='fixed-button'>
// 					<img src='./Repeat.svg' alt='' /> Подобрать заново
// 				</button>
// 			</div>
// 		</>
// 	)
// }

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Card } from './components/card'
import { getHouseAIRecommendations } from './services/api/apiServices'

export function App() {
	const [houses, setHouses] = useState([])
	const navigate = useNavigate()

	// Функция для получения данных
	const fetchHouses = async () => {
		try {
			const data = await getHouseAIRecommendations()
			setHouses(data.recommendations)
		} catch (err) {
			console.error('Ошибка при получении рекомендаций:', err)
		}
	}

	// При загрузке компонента
	useEffect(() => {
		fetchHouses()
	}, [])

	// Обработчик клика по карточке
	const handleCardClick = house => {
		navigate('/house-info', { state: { id: house.id } }) // передаем id, чтобы подгрузить детали
	}

	// Обработчик кнопки "Подобрать заново"
	const handleReload = () => {
		fetchHouses()
	}

	return (
		<>
			<main>
				<div className='top'>
					<img src='/logo.png' alt='' className='logo' />
					<h3>
						Мы подобрали для вас
						<br />
						<span>{houses.length} варианта</span> дома мечты:
					</h3>
				</div>

				{houses.map((house, index) => (
					<div key={index} onClick={() => handleCardClick(house)}>
						<Card house={house} />
					</div>
				))}
			</main>

			<div className='fixed-button-container'>
				<button className='fixed-button' onClick={handleReload}>
					<img src='./Repeat.svg' alt='' /> Подобрать заново
				</button>
			</div>
		</>
	)
}
