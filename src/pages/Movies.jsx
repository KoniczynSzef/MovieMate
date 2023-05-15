import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import MovieComponent from '../components/MovieComponent';
import Pagination from '../components/Pagination';
import { Spinner, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

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
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	useEffect(() => {
		const getTopMovies = async (type) => {
			setIsLoading(true);
			const [data, pages] = await fetchTopMovies(type, page);
			setTotalPages(pages);
			setMovies(data);
			setTimeout(() => {
				setIsLoading(false);
			}, 350);
		};

		getTopMovies('movie');
	}, [page, setMovies]);

	return !isLoading && movies.length >= 1 ? (
		<div className="min-h-screen flex flex-col justify-between">
			<div className="container mx-auto my-16 mt-32 flex flex-col gap-32 px-2">
				<h1 className="text-center text-4xl text-white"> Top rated movies, page {page}</h1>
				<div className="flex flex-wrap justify-center items-center gap-16">
					{movies.map((movie, index) =>
						movie.id !== undefined ? (
							<MovieComponent
								page={page}
								movie={movie}
								key={movie.id}
								index={index}
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

			<Pagination page={page} getPage={handlePageChange} totalPages={totalPages} />
		</div>
	) : (
		<div className="h-screen flex items-center justify-center">
			<Spinner size={'xl'} color="green.600" mb={'40'} />
		</div>
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Movies;
