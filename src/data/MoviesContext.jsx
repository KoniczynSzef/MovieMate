import { fetchData } from './index.js'

import { createContext, useState } from 'react'

const MoviesContext = createContext()

export const MoviesContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([])
	const [query, setQuery] = useState('')

	return (
		<MoviesContext.Provider value={{ movies, setMovies, query, setQuery }}>
			{children}
		</MoviesContext.Provider>
	)
}

export default MoviesContext
