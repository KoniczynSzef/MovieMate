import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import MovieComponent from '../components/MovieComponent';
import Pagination from '../components/Pagination';

const Movies = ({ movies }) => {
	const { setMovies } = useContext(MoviesContext);
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

			<div className=" flex flex-wrap gap-12">
				{movies.map((movie, index) => (
					<MovieComponent
						page={page}
						movie={movie}
						key={movie.id}
						category={'movies'}
						index={index}
					/>
				))}
			</div>

			<Pagination page={page} getPage={getPage} totalPages={totalPages} />
		</div>
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Movies;
