import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');
	const [movie, setMovie] = useState({});

	const [category, setCategory] = useState('');
	const [person, setPerson] = useState({});

	return (
		<MoviesContext.Provider
			value={{
				movies,
				setMovies,
				query,
				setQuery,
				movie,
				setMovie,
				category,
				setCategory,
				person,
				setPerson,
			}}>
			{children}
		</MoviesContext.Provider>
	);
};

MoviesContextProvider.propTypes = {
	children: PropTypes.element,
};

export default MoviesContext;
