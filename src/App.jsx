// importing Hooks
import { useContext, useEffect, useState } from 'react';
import './App.css';

// importing Context API
import MoviesContext from './data/MoviesContext';

// import fetchGenre function, which runs on app load
import { fetchGenre, fetchTopMovies } from './data';
import { GENRE_NAMES } from './data/assets';

// importing components
import Navbar from './components/Navbar';
import Search from './pages/Search';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Series';
import Movies from './pages/Movies';
import MovieCharacters from './pages/MovieCharacters';
import ForKids from './pages/ForKids';

function App() {
	const { movies, setMovies, query } = useContext(MoviesContext);

	const [topMovies, setTopMovies] = useState([]);

	useEffect(() => {
		const getTopMovies = async () => {
			const response = await fetchTopMovies();
			setTopMovies(response);
		};

		getTopMovies();
	}, []);

	useEffect(() => {
		const arrayGENRE_length = GENRE_NAMES.length;
		const randomNumberIndex = Math.floor(Math.random() * arrayGENRE_length);
		const getGenre = async (genre, index) => {
			const fetchedMovies = await fetchGenre(genre, index);
			setMovies(fetchedMovies);
		};
		getGenre(GENRE_NAMES[randomNumberIndex], randomNumberIndex);
	}, []);

	return (
		<div className="App bg-[#171717] min-h-screen">
			<Navbar />

			{/* Tutaj będzie react routing -> wybór strony movies.jsx itp */}
			<Routes>
				<Route path="/" element={<Home movies={topMovies} />}></Route>
				<Route path="/search" element={<Search movies={movies} query={query} />}></Route>

				<Route path="/movies" element={<Movies />}></Route>
				<Route path="/series" element={<Series />}></Route>
				<Route path="/for kids" element={<ForKids />}></Route>
				<Route path="/movie characters" element={<MovieCharacters />}></Route>
			</Routes>
		</div>
	);
}

export default App;
