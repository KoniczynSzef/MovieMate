import { useEffect, useState } from 'react'
import './App.css'

import { fetchData } from './data'

function App() {
	const [query, setQuery] = useState('')
	const [input, setInput] = useState('karate kid')
	const [checkbox, setCheckbox] = useState(false)
	const [movies, setMovies] = useState([])

	const getData = async (query) => {
		setQuery(query)
		const data = await fetchData(query)
		setMovies([data.results])
	}

	useEffect(() => {
		setQuery(input)
		getData(query)
	}, [])

	useEffect(() => {
		if (movies.length >= 1) {
			const moviesArr = movies[0]
			moviesArr.forEach((movie) => {
				console.log(movie)
			})
		}
	}, [movies])

	return (
		<div className="App">
			<form action="" onSubmit={(e) => e.preventDefault()}>
				Only series :{' '}
				<input
					type="checkbox"
					name=""
					id=""
					value={checkbox}
					onClick={() => setCheckbox((prev) => !prev)}
				/>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="border-solid border border-black"
				/>
				<button
					type="submit"
					className="bg-gray-700 text-white rounded-md px-6 py-2 transition duration-[250ms] hover:bg-gray-600"
					onClick={() => getData(input)}>
					Search
				</button>
			</form>

			{movies.length >= 1 &&
				movies[0].map((movie, index) => <p key={index}>{movie.original_title} </p>)}
		</div>
	)
}

export default App
