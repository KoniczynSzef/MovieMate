import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext, useId } from 'react';
import MoviesContext from '../data/MoviesContext';

const MovieComponent = ({ movie, index, category }) => {
	const { setSingleMovie, setSingleSeries } = useContext(MoviesContext);
	const id = useId();

	let linkTo = 'series'
	if(category) linkTo = 'movies'

	if(movie.media_type === 'movie') linkTo = 'movies'

	return (
		movie.poster_path && (
			<motion.div
				key={id}
				className="card h-[28rem] w-[15rem] relative rounded-md border-2 border-slate-400 hover:scale-[1.05] transition duration-300 overflow-hidden hover:bg-[#272727]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.25, delay: 0.1 * index }}>
				<Link
					to={`/${linkTo}/${movie.id}`}
					className="link-wrapper flex flex-col justify-between h-full"
					onClick={
						linkTo === 'series' ? () => setSingleSeries(movie) : () => setSingleMovie(movie)
					}>
					<Image
						as={motion.img}
						src={
							movie.poster_path &&
							`https://image.tmdb.org/t/p/w500${movie.poster_path}`
						}
						w={'full'}
						outlineOffset={'2px'}
						_focusVisible={{ outline: '2px solid #272727' }}
						transition={'300ms all ease-in-out'}
					/>
					<Box h={'full'}>
						{movie.title || movie.name ? (
							<Text
								className="movie-text"
								textAlign={'center'}
								color={'white'}
								fontSize={'xl'}
								fontWeight={'600'}
								h={'100%'}
								px={'2'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}>
								<q>{movie.title || movie.name}</q>
							</Text>
						) : (
							<Text
								textAlign={'center'}
								color={'white'}
								fontSize={'2xl'}
								py={'4'}
								px={'2'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}>
								Movie not found
							</Text>
						)}
					</Box>
				</Link>
			</motion.div>
		)
	);
};

MovieComponent.propTypes = {
	movie: PropTypes.any.isRequired,
	index: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	category: PropTypes.string
};

export default MovieComponent;
