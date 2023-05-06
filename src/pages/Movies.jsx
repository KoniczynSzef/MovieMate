import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import Pagination from '../components/Pagination';

const Movies = ({ movies }) => {
	const { setMovie, setMovies } = useContext(MoviesContext);
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

			<Pagination page={page} getPage={getPage} totalPages={totalPages} />
		</div>
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Movies;
