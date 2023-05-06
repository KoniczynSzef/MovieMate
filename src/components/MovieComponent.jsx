import { Image } from '@chakra-ui/react';
// import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MovieComponent = ({ category, movie, index, page }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, [page]);

	return (
		<motion.div
			className="card w-64 h-96 relative mt-2 rounded-md overflow-hidden"
			initial={{ opacity: 0 }}
			animate={visible ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.25, delay: 0.1 * index }}>
			<Link to={`/${category}/${movie.id}`} className="wrapper ">
				<Image
					as={motion.img}
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				/>
			</Link>
		</motion.div>
	);
};

MovieComponent.propTypes = {
	category: PropTypes.string.isRequired,
	movie: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
};

export default MovieComponent;
