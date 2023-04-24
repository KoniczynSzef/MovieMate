import axios from 'axios'

export const fetchData = async (query) => {
	const response = await axios.request({
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/movie?api_key=${
			import.meta.env.VITE_KEY
		}&language=pl`,

		params: {
			query: query,
		},
	})

	const data = await response.data.results
	return data
}

// export const fetchGenre = async (genre) => {
// 	try {
// 		const response = await axios.request({
// 			url: `https://api.themoviedb.org/3/discover/movie?api_key=${
// 				import.meta.env.VITE_KEY
// 			}&with_genres=${genre}`,

// 			params: {
// 				query: genre,
// 			},
// 		})

// 		const data = response.data.results
// 		return data

// 		// const allGenres = response.data.results
// 		// const data = allGenres.find((genre) => genre.name.toLowerCase() === genre.toLowerCase())

// 		// if (!data) {
// 		// 	return `No genre founded`
// 		// }
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
