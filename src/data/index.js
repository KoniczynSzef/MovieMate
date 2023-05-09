import axios from 'axios';
import { GENRE_NAMES, GENRES } from './assets';

const randomizeData = (data) => {
	for (let i = data.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[data[i], data[j]] = [data[j], data[i]];
	}

	return data;
};

export const fetchData = async (query, page) => {
	const response = await axios.request({
		method: 'GET',
		url: `https://api.themoviedb.org/3/search/multi?api_key=${
			import.meta.env.VITE_KEY
		}&language=en-us&query=${query}&page=${page}`,
	});

	const data = await response.data.results;
	return [data, response.data.total_pages];
};

export const fetchGenre = async (genre, page) => {
	let genreID = 0;

	GENRES.forEach((category, index) => {
		if (category === genre) {
			genreID = GENRE_NAMES[index];
		}
	});
	const response = await axios.request(
		`https://api.themoviedb.org/3/discover/movie?api_key=${
			import.meta.env.VITE_KEY
		}&language=en-us&with_genres=${genreID}&page=${page}`,
	);
	const data = await response.data.results;

	const dataRandomized = randomizeData(data);

	return [dataRandomized, response.data.total_pages];
};

export const fetchTrendingMovies = async (page) => {
	const response = await axios.request({
		url: `https://api.themoviedb.org/3/trending/all/day?api_key=${
			import.meta.env.VITE_KEY
		}&page=${page}`,
	});

	const data = await response.data.results;

	const dataRandomized = randomizeData(data);

	return [dataRandomized, response.data.total_pages];
};

export const fetchTrendingPeople = async (page) => {
	const response = await axios.request({
		url: `https://api.themoviedb.org/3/trending/person/day?api_key=${
			import.meta.env.VITE_KEY
		}&page=${page}`,
	});

	const data = await response.data.results;

	const dataRandomized = randomizeData(data);

	return [dataRandomized, response.data.total_pages];
};

export const fetchTopMovies = async (type, page) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/${type}/top_rated?api_key=${
			import.meta.env.VITE_KEY
		}&page=${page}`,
	);

	const data = await response.data.results;

	const dataRandomized = randomizeData(data);

	return [dataRandomized, response.data.total_pages];
};
