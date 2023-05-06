import { PropTypes } from 'prop-types';

const Movie = ({ movie }) => {
	return <div>Movie {movie.id}</div>;
};

Movie.propTypes = {
	movie: PropTypes.object,
};

export default Movie;
