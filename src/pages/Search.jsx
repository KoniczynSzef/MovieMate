import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MoviesContext from '../data/MoviesContext';

const Search = ({ movies, query }) => {
	const { movie, setMovie } = useContext(MoviesContext);
	console.log(movies);
	return (
		movies.length >= 1 && (
			<div className="mt-24">
				{query !== '' && (
					<h1 className="text-center text-4xl text-white">
						Search results for : <span className="capitalize">{query}</span>
					</h1>
				)}

				{movies.map((movie, index) => (
					<Link
						key={index}
						to={`/movies/${movie.id}`}
						movieProp={movie}
						onClick={() => setMovie(movie)}>
						<p>{movie.original_title} </p>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt="Not showing"
						/>
					</Link>
				))}
			</div>
		)
	);
};

Search.propTypes = {
	movies: PropTypes.array.isRequired,
	query: PropTypes.string,
};

export default Search;
