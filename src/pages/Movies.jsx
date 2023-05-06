import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';

const Movies = ({ movies }) => {
	const { setMovie, setMovies } = useContext(MoviesContext);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const getTopMovies = async (type) => {
			const [data, pages] = await fetchTopMovies(type, page);
			setTotalPages(pages);
			setMovies(data);
		};

		getTopMovies('movie');
	}, [page, setMovies]);

	return (
		<div>
			<h1>{page}</h1>
			{movies.map((movie, index) => (
				<Link key={index} to={`/movies/${movie.id}`} onClick={() => setMovie(movie)}>
					<p>{movie.original_title} </p>
					<img
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt="Not showing"
					/>
				</Link>
			))}
			{page > 1 && (
				<button onClick={() => setPage((prev) => (prev -= 1))} className="bg-red-300 px-12">
					Prev Page
				</button>
			)}
			{page < totalPages && (
				<button onClick={() => setPage((prev) => (prev += 1))} className="bg-red-300 px-12">
					Next Page
				</button>
			)}
		</div>
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Movies;
