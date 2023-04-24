// importing Hooks
import { useContext } from 'react'
import './App.css'

// importing Context API
import MoviesContext from './data/MoviesContext'

// importing components
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
	const { movies, query } = useContext(MoviesContext)

	return (
		<div className="App bg-[#171717] min-h-screen">
			<Navbar />

			{movies.length > 1 && (
				<div className="mt-24">
					<h1 className="text-center text-4xl text-white">
						Search results for : <span className="capitalize">{query}</span>
					</h1>
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
