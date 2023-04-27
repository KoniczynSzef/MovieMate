import { useContext, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/vite.svg';
import { LINKS } from '../data/assets';
import './Navbar.css';

import { fetchData } from '../data';
import MoviesContext from '../data/MoviesContext';

const Navbar = () => {
	const inputId = useId();
	const [input, setInput] = useState('');

	const { movies, setMovies, setQuery } = useContext(MoviesContext);

	const getData = async (query) => {
		setQuery(query);
		const fetchedMovies = await fetchData(query);

		console.log(fetchedMovies.length);
		setMovies(fetchedMovies);
		console.log(movies);
	};

	return (
		<div className="bg-[#070707]">
			<header className="container relative mx-auto py-6 flex items-center justify-between px-2">
				<Link to={'/'} className="logo transition duration-200 ml-2" title="MovieMate">
					<img src={logo} alt="" />
				</Link>

				<nav>
					<ul className="flex gap-2 lg:gap-4 items-center">
						{LINKS.map((link, idx) => (
							<li key={idx} className="hidden md:block">
								<Link
									to={`/${link}`}
									className="px-5 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300">
									{link}
								</Link>
							</li>
						))}

						<form
							className="flex"
							onSubmit={(e) => {
								e.preventDefault();
								getData(input);
							}}>
							<input
								type="search"
								placeholder="Search on MovieMate..."
								className="px-3 bg-transparent border border-solid border-gray-700 py-2 text-gray-200 rounded-md outline-none"
								value={input}
								id={inputId}
								onChange={(e) => setInput(e.target.value)}
							/>
						</form>
					</ul>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
