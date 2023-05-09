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
		<div className="min-h-full flex flex-col justify-between">
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<h1 className="text-center text-4xl text-white"> Top rated movies, page {page}</h1>
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{movies.map((movie, index) =>
						movie.id !== undefined ? (
							<MovieComponent
								page={page}
								movie={movie}
								movieId={movie.id}
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
			<div className="absolute -bottom-16 w-full">
				<Pagination page={page} getPage={handlePageChange} totalPages={totalPages} />
			</div>
		</div>
	) : (
		<Spinner size={'xl'} color="purple.600" position={'absolute'} inset={'0'} m={'auto'} />
	);
};

Movies.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Movies;
