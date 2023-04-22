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

	const data = await response.data
	return data
}
