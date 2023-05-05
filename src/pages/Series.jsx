import { useContext } from 'react';
import MoviesContext from '../data/MoviesContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTopMovies } from '../data';

const Series = ({ movies }) => {
	const { setMovie, setMovies, setPage, page } = useContext(MoviesContext);

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

		getTopMovies('tv', page);
	};
	return (
		<div>
			{movies.map((movie, index) => (
				<Link key={index} to={`/series/${movie.id}`} onClick={() => setMovie(movie)}>
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

Series.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Series;
