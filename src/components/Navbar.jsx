import { useContext, useId, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import logo from '../assets/vite.svg';
import { GENRES, LINKS } from '../data/assets';
import './Navbar.css';

import { fetchData, fetchTopMovies } from '../data';
import MoviesContext from '../data/MoviesContext';

import { motion, AnimatePresence } from 'framer-motion';

import '../App.css';

const Navbar = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const navigate = useNavigate();

	const inputId = useId();
	const [input, setInput] = useState('');

	const { setMovies, setQuery, setPage } = useContext(MoviesContext);

	const getData = async (query) => {
		setQuery(query);
		const fetchedMovies = await fetchData(query);
		setMovies(fetchedMovies);
	};

	const getTypeOfMovie = async (type) => {
		setInput('');

		if (type === 'movies') {
			const data = await fetchTopMovies('movie');
			setMovies(data);
			setPage(1);
		} else if (type === 'series') {
			const data = await fetchTopMovies('tv');
			setMovies(data);
		}
	};

	return (
		<div className="bg-[#070707]">
			<header className="container relative mx-auto py-6 flex items-center justify-between px-2">
				<Link
					to={'/'}
					className="logo transition duration-200 ml-2"
					title="MovieMate"
					onClick={() => {
						setInput('');
						navigate('/');
					}}>
					<img src={logo} alt="" />
				</Link>

				<nav>
					<ul className="flex gap-2 lg:gap-4 items-center">
						{LINKS.map((link, idx) => (
							<li key={idx} className="hidden md:block">
								<Link
									onClick={() => getTypeOfMovie(link)}
									to={`/${link}`}
									className="px-5 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300">
									{link}
								</Link>
							</li>
						))}
						<li
							className="dropdown px-5 py-2 rounded-sm bg-inherit border-2 border-solid cursor-pointer border-[#272727] hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300"
							onMouseEnter={() => setShowDropdown(true)}
							onMouseLeave={() => setShowDropdown(false)}>
							Select Genre :
							{showDropdown && (
								<AnimatePresence>
									<motion.ul
										className="bg-red-500 flex flex-col gap-2"
										key={'dropdown'}
										initial={{ height: 0 }}
										animate={{ height: 'auto' }}
										transition={{ duration: 0.1 * GENRES.length }}>
										{GENRES.map((genre, index) => (
											<motion.li
												className="w-full h-full flex"
												value=""
												key={index}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.25, delay: 0.1 * index }}>
												<Link
													to={`/genre/${genre}`}
													className="w-full p-2 pl-4">
													{genre}
												</Link>
											</motion.li>
										))}
									</motion.ul>
								</AnimatePresence>
							)}
						</li>

						<form
							className="flex"
							onSubmit={(e) => {
								e.preventDefault();
								navigate('/search');
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
