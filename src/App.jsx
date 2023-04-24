import { useState, useId } from 'react'
import './App.css'

// imported function from index.js
import Navbar from './components/Navbar'

import { fetchData } from './data'

import { Routes, Route } from 'react-router-dom'

function App() {
	const inputId = useId()

	const [query, setQuery] = useState('')
	const [input, setInput] = useState('')
	const [movies, setMovies] = useState([])

	const getData = async (query) => {
		if (query === '') {
			setQuery('')
			setMovies([])
		} else {
			setQuery(query)
			const data = await fetchData(query)
			setMovies([data.results])
		}
	}

	return (
		<div className="App">
			<Navbar />
			<form action="" onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					id={inputId}
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

			{movies.length >= 1 && (
				<div>
					<h1>Search results for : {query} </h1>
					{movies[0].map((movie, index) => (
						<div key={index}>
							<p>{movie.original_title} </p>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt="Not showing"
							/>
						</div>
					))}
				</div>
			)}

			{/* Tutaj będzie react routing -> wybór strony movies.jsx itp */}
			<Routes>
				<Route></Route>
			</Routes>
		</div>
	)
}

export default App
