import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../data';
import Pagination from '../components/Pagination';
import MovieComponent from '../components/MovieComponent';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const getPage = (page) => {
		setPage(page);
	};

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
					<div className=" flex flex-wrap gap-12">
						{movies.map((movie, index) => (
							<MovieComponent
								page={page}
								movie={movie}
								key={movie.id}
								category={'movies'}
								index={index}
							/>
						))}
					</div>
				</div>
			)}

			<Pagination page={page} getPage={getPage} totalPages={totalPages} />
		</div>
	);
};

export default Home;
