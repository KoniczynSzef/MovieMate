import PropTypes from 'prop-types';
import { useContext, useEffect, useState, useId } from 'react';
import MoviesContext from '../data/MoviesContext';
import { fetchTopMovies } from '../data';
import MovieComponent from '../components/MovieComponent';
import Pagination from '../components/Pagination';
import { Spinner } from '@chakra-ui/react';

import { v4 as uuidv4 } from 'uuid';

const Movies = ({ movies }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { setMovies } = useContext(MoviesContext);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isRendered, setRendered] = useState(false);

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			window.scrollTo({ behavior: 'smooth', top: 0 });
			setTimeout(() => setPage(newPage), 500);
		}
	};

	// useEffect(() => {
	// 	if (!isRendered) {
	// 		const getTopMovies = async (type) => {
	// 			setIsLoading(true);
	// 			try {
	// 				const [data, pages] = await fetchTopMovies(type, page);
	// 				console.log(data);
	// 				setTotalPages(pages);
	// 				setMovies(data);
	// 			} catch (err) {
	// 				console.log(err);
	// 			} finally {
	// 				setTimeout(() => setIsLoading(false), 200);
	// 				setRendered(true);
	// 			}
	// 		};

	// 		getTopMovies('movie');
	// 	}
	// }, [page, setMovies, isRendered]);

	useEffect(() => {
		if (!isRendered) {
			const getTopMovies = async (type) => {
				setIsLoading(true);
				try {
					const [data, pages] = await fetchTopMovies(type, page);
					console.log(data);
					setTotalPages(pages);
					setMovies(data);
					setIsLoading(false);
					setRendered(true);
				} catch (error) {
					console.error(error);
					setIsLoading(false);
				}
			};

			getTopMovies('movie');
		}
	}, [page, setMovies, isRendered]);

	return !isLoading ? (
		<div>
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<h1 className="text-center text-4xl text-white">Top rated movies, page {page}</h1>
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{movies.map((movie, index) => {
						return (
							<MovieComponent
								page={page}
								movie={movie}
								movieId={movie.id}
								key={uuidv4()}
								category={'movies'}
								index={index}
								isGenre={false}
							/>
						);
					})}
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
