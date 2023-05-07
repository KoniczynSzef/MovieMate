import { Image } from '@chakra-ui/react';
// import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MovieComponent = ({ category, movie, index, page }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// console.log(movie);
		setVisible(true);
	}, [page, movie]);

	return (
		<motion.div
			className="card w-64 h-96 relative mt-2 rounded-md"
			initial={{ opacity: 0 }}
			animate={visible ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.25, delay: 0.1 * index }}>
			<Link to={`/${category}/${movie.id}`} className="link-wrapper">
				<Image
					borderRadius={'md'}
					as={motion.img}
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
};

export default MovieComponent;
