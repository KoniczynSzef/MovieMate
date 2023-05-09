import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MoviesContext from '../data/MoviesContext';
import { fetchData } from '../data';
import MovieComponent from '../components/MovieComponent';
import Person from './Person';
import Pagination from '../components/Pagination';
import { Spinner } from '@chakra-ui/react';

const Search = () => {
	const { query } = useContext(MoviesContext);

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			window.scrollTo({ behavior: 'smooth', top: 0 });
			setTimeout(() => setPage(newPage), 500);
		}
	};

	useEffect(() => {
		const fetchSearchedMovies = async () => {
			setIsLoading(true);

			if (query === '') return;

			const [data, pages] = await fetchData(query, page);
			setTotalPages(pages);
			setData(data);
			setTimeout(() => {
				setIsLoading(false);
			}, 350);
		};

		fetchSearchedMovies();
	}, [query, page]);

	return !isLoading && data.length >= 1 ? (
		<div className="min-h-full flex flex-col justify-between">
			<div className="container mx-auto flex flex-col gap-16 my-16">
				{query !== '' && (
					<h1 className="text-center text-4xl text-white">
						Search results for : <span className="capitalize">{query}</span>
					</h1>
				)}

				<div className="flex flex-wrap gap-12 justify-center items-center">
					{data.map((param, index) =>
						param.media_type === 'movie' || param.media_type === 'tv' ? (
							<MovieComponent
								page={page}
								movie={param}
								movieId={param.id}
								key={param.id}
								category={'movies'}
								index={index}
								isGenre={false}
							/>
						) : (
							<Person person={param} index={index} key={index} />
						),
					)}
				</div>
			</div>
			<Pagination page={page} totalPages={totalPages} getPage={handlePageChange} />
		</div>
	) : (
		<Spinner size={'xl'} color="purple.600" position={'absolute'} inset={'0'} m={'auto'} />
	);
};

Search.propTypes = {
	movies: PropTypes.array.isRequired,
	query: PropTypes.string,
};

export default Search;
