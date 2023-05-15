import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');

	const [singleMovie, setSingleMovie] = useState({});
	const [singleSeries, setSingleSeries] = useState({});

	const [category, setCategory] = useState('');
	const [person, setPerson] = useState({});

	const [session, setSession] = useState('');

	return (
		<MoviesContext.Provider
			value={{
				movies,
				setMovies,
				query,
				setQuery,
				singleMovie,
				setSingleMovie,
				singleSeries,
				setSingleSeries,
				category,
				setCategory,
				person,
				setPerson,
				session,
				setSession,
			}}>
			{children}
		</MoviesContext.Provider>
	);
};

MoviesContextProvider.propTypes = {
	children: PropTypes.element,
};

export default MoviesContext;
