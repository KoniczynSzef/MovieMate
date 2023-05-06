// importing Hooks
import { useContext } from 'react';
import './App.css';

// importing Context API
import MoviesContext from './data/MoviesContext';

// importing components
import Navbar from './components/Navbar';
import Search from './pages/Search';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Series';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import People from './pages/People';
import Person from './pages/Person';

function App() {
	const { movies, query, movie, category, person } = useContext(MoviesContext);

	return (
		<div className="App bg-[#171717] min-h-screen">
			<Navbar />

			<div className="container mx-auto ">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/search"
						element={<Search movies={movies} query={query} />}></Route>
					<Route path="/movies" element={<Movies movies={movies} />} />
					<Route path="/series" element={<Series movies={movies} />} />
					<Route path="/people" element={<People />} />

					<Route path="/movies/:id" element={<Movie movie={movie} />} />
					<Route path="/series/:id" element={<Movie movie={movie} />} />
					<Route path="/genre/:genre" element={<Category category={category} />} />
					<Route path="/people/:id" element={<Person person={person} />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
