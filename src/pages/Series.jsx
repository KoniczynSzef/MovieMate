import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { Link } from 'react-router-dom';
import { fetchTopMovies } from '../data';
import Pagination from '../components/Pagination';

const Series = () => {
	const { setMovie, setMovies, movies } = useContext(MoviesContext);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const getPage = (page) => {
		setPage(page);
	};

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
			<Pagination page={page} getPage={getPage} totalPages={totalPages} />
		</div>
	);
};

export default Series;
