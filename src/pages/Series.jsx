import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import Pagination from '../components/Pagination';
import { Spinner } from '@chakra-ui/react';
import MovieComponent from '../components/MovieComponent';

const Series = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { setMovies, movies } = useContext(MoviesContext);
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

		getTopMovies('tv');
	}, [page, setMovies]);

	return !isLoading ? (
		<div>
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<h1 className="text-center text-4xl text-white">Top rated series, page {page}</h1>
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{movies.map((movie, index) => (
						<MovieComponent
							page={page}
							movie={movie}
							key={index}
							category={'tv'}
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

export default Series;
