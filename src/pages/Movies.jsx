import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';

const Movies = ({ moviesArr }) => {
	const { setMovie, setMovies, page, setPage } = useContext(MoviesContext);

	const getTopMovies = async (type, page) => {
		const data = await fetchTopMovies(type, page);
		setMovies(data);
	};

	const goToNextOrPrevPage = (direction) => {
		if (direction === 'next') {
			setPage((prev) => (prev += 1));
		} else {
			setPage((prev) => (prev -= 1));
		}

		getTopMovies('movie', page);
	};

	return (
		<div>
			<h1>{page}</h1>
			{moviesArr.map((movie, index) => (
				<Link key={index} to={`/movies/${movie.id}`} onClick={() => setMovie(movie)}>
					<p>{movie.original_title} </p>
					<img
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt="Not showing"
					/>
				</Link>
			))}
			{page > 1 && (
				<button onClick={() => goToNextOrPrevPage('prev')} className="bg-red-300 px-12">
					Prev Page
				</button>
			)}
			{page < 1000 && (
				<button onClick={() => goToNextOrPrevPage('next')} className="bg-red-300 px-12">
					Next Page
				</button>
			)}
		</div>
	);
};

Movies.propTypes = {
	moviesArr: PropTypes.array.isRequired,
};

export default Movies;
