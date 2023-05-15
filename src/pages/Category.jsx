import { useEffect, useContext, useState } from 'react';
import MoviesContext from '../data/MoviesContext';

import { fetchGenre } from '../data';
import PropTypes from 'prop-types';
import MovieComponent from '../components/MovieComponent';
import Pagination from '../components/Pagination';
import { Spinner } from '@chakra-ui/react';

const Category = () => {
	const { category } = useContext(MoviesContext);
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			window.scrollTo({ behavior: 'smooth', top: 0 });
			setTimeout(() => setPage(newPage), 500);
		}
	};

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	useEffect(() => {
		const getGenre = async () => {
			setIsLoading(true);
			const [data, pages] = await fetchGenre(category, page);
			setMovies(data);
			setTotalPages(pages);
			setTimeout(() => setIsLoading(false), 200);
		};

		getGenre();
	}, [page, setMovies, category]);

	return !isLoading ? (
		<div>
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<h1 className="text-center text-4xl text-white">Top {category} movies</h1>
				<div className="flex flex-wrap gap-16 justify-center items-center">
					{movies.map((movie, index) => (
						<MovieComponent page={page} movie={movie} key={movie.id} index={index} />
					))}
				</div>
			</div>

			<Pagination page={page} getPage={handlePageChange} totalPages={totalPages} />
		</div>
	) : (
		<div className="h-screen flex items-center justify-center">
			<Spinner size={'xl'} color="green.600" mb={'40'} />
		</div>
	);
};

Category.propTypes = {
	category: PropTypes.string,
};

export default Category;
