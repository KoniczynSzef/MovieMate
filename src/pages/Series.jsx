import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { Link } from 'react-router-dom';
import { fetchTopMovies } from '../data';

const Series = () => {
	const { setMovie, setMovies, movies } = useContext(MoviesContext);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const getTopMovies = async (type) => {
			const [data, pages] = await fetchTopMovies(type, page);
			setTotalPages(pages);
			setMovies(data);
		};

		getTopMovies('tv');
	}, [page, setMovies]);
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

export default Series;
