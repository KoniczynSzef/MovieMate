import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import Pagination from '../components/Pagination';
import { Spinner, Text } from '@chakra-ui/react';
import MovieComponent from '../components/MovieComponent';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

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
		<div className="flex flex-col justify-between min-h-screen">
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<h1 className="text-center text-4xl text-white">Top rated series, page {page}</h1>
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{movies.map((movie, index) =>
						movie.id !== undefined ? (
							<MovieComponent
								page={page}
								movie={movie}
								key={movie.id}
								category={'movies'}
								index={index}
								isGenre={false}
							/>
						) : (
							<MotionText
								textAlign={'center'}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
								key={index}
								fontSize={'4xl'}
								color={'white'}
								mt={'10%'}>
								{index % 2 === 0
									? `Too many requests on page ${page}`
									: 'Try other genre or go to the next page'}
							</MotionText>
						),
					)}
				</div>
			</div>

			<div className="w-full">
				<Pagination page={page} getPage={handlePageChange} totalPages={totalPages} />
			</div>
		</div>
	) : (
		<Spinner size={'xl'} color="purple.600" position={'absolute'} inset={'0'} m={'auto'} />
	);
};

export default Series;
