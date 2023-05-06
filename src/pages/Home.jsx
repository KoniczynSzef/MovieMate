import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../data';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const getTrendingMovies = async () => {
			const [data, pages] = await fetchTrendingMovies(page);
			setTotalPages(pages);
			setMovies(data);
		};

		getTrendingMovies();
	}, [page]);

	return (
		<div>
			{movies.length >= 1 && (
				<div className="mt-24">
					<h1 className="text-center text-4xl text-white">Current trending movies</h1>
					{movies.map((movie, index) => (
						<div key={index}>
							<p>{movie.original_title} </p>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt="Not showing"
							/>
						</div>
					))}
				</div>
			)}
			{page > 1 && (
				<button onClick={() => setPage((prev) => (prev -= 1))} className="bg-red-300 px-12">
					Prev Page
				</button>
			)}
			{page < totalPages && (
				<button onClick={() => setPage((prev) => (prev += 1))} className="bg-red-300 px-12">
					Next Page
				</button>
			)}
		</div>
	);
};

export default Home;
