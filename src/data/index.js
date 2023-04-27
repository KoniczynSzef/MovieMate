import axios from 'axios';
import { GENRE_NAMES } from './assets';

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

export const fetchGenre = async (genreID, index) => {
	if (parseInt(localStorage.getItem('genre')) === genreID) {
		if (index < GENRE_NAMES.length - 1) {
			genreID = GENRE_NAMES[index + 1];
		} else {
			genreID = GENRE_NAMES[0];
		}
	}

	const response = await axios.request(
		`https://api.themoviedb.org/3/discover/movie?api_key=${
			import.meta.env.VITE_KEY
		}&language=en-us&with_genres=${genreID}`,
	);
	const data = await response.data;

	localStorage.setItem('genre', genreID);

	return data.results;
};

export const fetchTopMovies = async () => {
	const response = await axios.request({
		url: `https://api.themoviedb.org/3/discover/movie?api_key=${
			import.meta.env.VITE_KEY
		}&sort_by=vote_average.desc`,
	});

	const data = await response.data;
	const bestMovies = data.results.slice(0, 4);

	return bestMovies;
};
