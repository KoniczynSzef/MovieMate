import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState, useId } from 'react';
import MoviesContext from '../data/MoviesContext';

const MovieComponent = ({ movie, index, page }) => {
	const [visible, setVisible] = useState(false);
	const { setSingleMovie, setSingleSeries } = useContext(MoviesContext);
	const id = useId();

	useEffect(() => {
		setVisible(true);
	}, [page, movie]);

	const isNotAMovie = movie.media_type === 'tv' ? true : false;

	return (
		movie.poster_path && (
			<motion.div
				key={id}
				className="card h-[28rem] w-[15rem] relative rounded-md border-2 border-slate-400 hover:scale-[1.05] transition duration-300 overflow-hidden hover:bg-[#272727]"
				initial={{ top: '4rem' }}
				animate={visible ? { top: 0 } : { top: '4rem' }}
				transition={{ duration: 0.25, delay: 0.1 * index }}>
				<Link
					to={`/${movie.media_type === 'tv' ? 'series' : 'movies'}/${movie.id}`}
					className="link-wrapper flex flex-col justify-between h-full"
					onClick={
						isNotAMovie ? () => setSingleSeries(movie) : () => setSingleMovie(movie)
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
};

export default MovieComponent;
