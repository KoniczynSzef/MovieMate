import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState, useId } from 'react';
import MoviesContext from '../data/MoviesContext';

const MovieComponent = ({ category, movie, index, page, isGenre }) => {
	const [visible, setVisible] = useState(false);
	const { setMovie } = useContext(MoviesContext);
	const id = useId();

	useEffect(() => {
		setVisible(true);
	}, [page, movie]);

	return (
		movie.poster_path && (
			<motion.div
				key={id}
				className="card w-[20rem] h-[36rem] relative rounded-md border-2 border-white hover:scale-[1.05] transition duration-300 overflow-hidden hover:bg-[#272727]"
				initial={{ opacity: 0 }}
				animate={visible ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.25, delay: 0.1 * index }}>
				<Link
					to={`/${category}/${movie.id}`}
					className="link-wrapper flex flex-col justify-between h-full"
					onClick={isGenre && (() => setMovie(movie))}>
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
								textAlign={'center'}
								color={'white'}
								fontSize={'2xl'}
								h={'100%'}
								py={'4'}
								px={'2'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}>
								<cite>{movie.title || movie.name}</cite>
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
	category: PropTypes.string.isRequired,
	movie: PropTypes.any.isRequired,
	index: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	isGenre: PropTypes.bool.isRequired,
};

export default MovieComponent;
