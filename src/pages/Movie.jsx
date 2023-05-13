import { PropTypes } from 'prop-types';
import { useEffect } from 'react';

const Movie = ({ singleMovie }) => {
	useEffect(() => {
		console.log(singleMovie);
	}, [singleMovie]);

	return <div className="text-white">Movie {singleMovie.id || 'Brak'}</div>;
};

Movie.propTypes = {
	singleMovie: PropTypes.object,
};

export default Movie;
