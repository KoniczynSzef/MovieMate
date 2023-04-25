import axios from 'axios';

export const fetchData = async (query) => {
	const response = await axios.request({
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/movie?api_key=${
			import.meta.env.VITE_KEY
		}&language=en-us`,

		params: {
			query: query,
		},
	});

	const data = await response.data.results;
	return data;
};

export const fetchGenre = async (genre) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${
			import.meta.env.VITE_KEY
		}&language=en-us&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&time=${new Date()}`,
	);
	const data = await response.json();
	return data.results;
};

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
