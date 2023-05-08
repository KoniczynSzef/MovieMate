import { Image } from '@chakra-ui/react';
// import React from 'react';
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
		<motion.div
			key={id}
			className="card w-64 h-96 relative mt-2 rounded-md"
			initial={{ opacity: 0 }}
			animate={visible ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.25, delay: 0.1 * index }}>
			<Link
				to={`/${category}/${movie.id}`}
				className="link-wrapper"
				onClick={isGenre && (() => setMovie(movie))}>
				<Image
					borderRadius={'md'}
					as={motion.img}
					src={movie.poster_path && `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					w={'64'}
					h={'96'}
					_hover={{ transform: 'scale(1.1)' }}
					outlineOffset={'2px'}
					_focusVisible={{ outline: '2px solid #272727' }}
					transition={'300ms all ease-in-out'}
				/>
			</Link>
		</motion.div>
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
