import React from 'react';
import { ReactPropTypes } from 'react';

const Search = ({ movies, query }) => {
	return (
		movies.length >= 1 && (
			<div className="mt-24">
				{query !== '' && (
					<h1 className="text-center text-4xl text-white">
						Search results for : <span className="capitalize">{query}</span>
					</h1>
				)}

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

export default Search;
