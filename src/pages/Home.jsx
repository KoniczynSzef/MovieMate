import React from 'react';

const Home = ({ movies }) => {
	return (
		movies.length >= 1 && (
			<div className="mt-24 bg-red-50">
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
		)
	);
};

export default Home;
