import { useEffect, useContext, useState } from 'react';
import MoviesContext from '../data/MoviesContext';

import { fetchGenre } from '../data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Category = () => {
	const { setMovie, category } = useContext(MoviesContext);
	console.log(category);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const getGenre = async () => {
			const [data, pages] = await fetchGenre(category, page);
			setMovies(data);
			setTotalPages(pages);
		};

		getGenre();
	}, [page, setMovies, category]);

	return (
		<div>
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

Category.propTypes = {
	category: PropTypes.string,
};

export default Category;
