import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import MovieComponent from '../components/MovieComponent';
import Pagination from '../components/Pagination';
import { Spinner } from '@chakra-ui/react';

const Movies = ({ movies }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { setMovies } = useContext(MoviesContext);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			window.scrollTo({ behavior: 'smooth', top: 0 });
			setTimeout(() => setPage(newPage), 500);
		}
	};

	useEffect(() => {
		const getTopMovies = async (type) => {
			setIsLoading(true);
			const [data, pages] = await fetchTopMovies(type, page);
			setTotalPages(pages);
			setMovies(data);
			setTimeout(() => setIsLoading(false), 200);
		};

		getTopMovies('movie');
	}, [page, setMovies]);

	return !isLoading ? (
		<div>
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<h1 className="text-center text-4xl text-white">Top rated movies, page {page}</h1>
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{movies.map((movie, index) => (
						<MovieComponent
							page={page}
							movie={movie}
							key={movie.id}
							category={'movies'}
							index={index}
							isGenre={false}
						/>
					))}
				</div>
			</div>

			<Pagination page={page} getPage={handlePageChange} totalPages={totalPages} />
		</div>
	) : (
		<Spinner size={'xl'} color="purple.600" position={'absolute'} inset={'0'} m={'auto'} />
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Movies;
