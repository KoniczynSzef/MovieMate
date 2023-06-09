// importing Hooks
import { useContext, useEffect, useState } from 'react';
import './App.css';

// importing Context API
import MoviesContext from './data/MoviesContext';

import { Routes, Route } from 'react-router-dom';

// importing components
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Home from './pages/Home';
import Series from './pages/Series';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import People from './pages/People';
import Serie from './pages/Serie';
import Actor from './pages/Actor';

const App = () => {
	const { movies, query, singleMovie, singleSeries, category, person } =
		useContext(MoviesContext);

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	return (
		<div className="App bg-[#171717] min-h-screen">
			<Navbar />

			<div className="main-wrapper relative">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/search"
						element={<Search movies={movies} query={query} />}></Route>
					<Route path="/movies" element={<Movies movies={movies} />} />
					<Route path="/series" element={<Series movies={movies} />} />
					<Route path="/actors" element={<People />} />

					<Route path="/movies/:id" element={<Movie singleMovie={singleMovie} />} />
					<Route path="/series/:id" element={<Serie singleSeries={singleSeries} />} />
					<Route path="/genre/:genre" element={<Category category={category} />} />
					<Route path="/actors/:id" element={<Actor person={person} />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
