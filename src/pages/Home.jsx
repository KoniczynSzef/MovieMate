import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ movies }) => {
	return (
		movies.length >= 1 && (
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
		)
	);
};

Home.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default Home;
