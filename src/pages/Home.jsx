import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../data';
import Pagination from '../components/Pagination';
import MovieComponent from '../components/MovieComponent';
import { Spinner } from '@chakra-ui/react';

const Home = () => {
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
		const getTrendingMovies = async () => {
			setIsLoading(true);
			const [data, pages] = await fetchTrendingMovies(page);
			setTotalPages(pages);
			setMovies(data);
			setTimeout(() => setIsLoading(false), 200);
		};

		getTrendingMovies();
	}, [page]);

	return !isLoading ? (
		<div>
			{movies.length >= 1 && (
				<div className="container mx-auto my-16 mt-32 flex flex-col gap-32 px-2">
					<h1 className="text-center text-4xl text-white">
						Current trending on MovieMate
					</h1>
					<div className="flex flex-wrap justify-center items-center gap-16">
						{movies.map((movie, index) => (
							<MovieComponent
								page={page}
								movie={movie}
								key={movie.id}
								index={index}
							/>
						))}
					</div>
				</div>
			)}

			<Pagination page={page} getPage={handlePageChange} totalPages={totalPages} />
		</div>
	) : (
		<div className="h-screen flex items-center justify-center">
			<Spinner size={'xl'} color="green.600" mb={'40'} />
		</div>
	);
};

export default Home;
