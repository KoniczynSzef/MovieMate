import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');
	const [movie, setMovie] = useState();
	const [page, setPage] = useState(1);

	return (
		<MoviesContext.Provider
			value={{ movies, setMovies, query, setQuery, movie, setMovie, page, setPage }}>
			{children}
		</MoviesContext.Provider>
	);
};

MoviesContextProvider.propTypes = {
	children: PropTypes.element,
};

export default MoviesContext;
