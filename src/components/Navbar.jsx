import { useContext, useId, useRef, useState } from 'react';

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
	const input = useRef();

	const { setMovies, setQuery, setCategory } = useContext(MoviesContext);

	const getData = async () => {
		const q = input.current.value;
		setQuery(q);
		const fetchedMovies = await fetchData(q);
		setMovies(fetchedMovies);
	};

	const getTypeOfMovie = async (type) => {
		input.current.value = '';

		if (type === 'movies') {
			const data = await fetchTopMovies('movie');
			setMovies(data);
		} else if (type === 'series') {
			const data = await fetchTopMovies('tv');
			setMovies(data);
		}
	};

	return (
		<div className="bg-[#070707]">
			<header className="container relative mx-auto py-6 flex items-center justify-between px-2">
				<Link
					tabIndex={1}
					to={'/'}
					className="logo transition duration-200 ml-2"
					title="MovieMate"
					onClick={() => {
						input.current.value = '';
						navigate('/');
					}}>
					<img src={logo} alt="" className="scale-125 md:scale-150" />
				</Link>

				<nav>
					<ul className="flex gap-2 lg:gap-4 items-center">
						{LINKS.map((link, idx) => (
							<li key={idx} className="hidden md:block">
								<Link
									tabIndex={idx + 2}
									onClick={() => getTypeOfMovie(link)}
									onFocus={() => setShowDropdown(false)}
									to={`/${link}`}
									className="px-5 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300">
									{link}
								</Link>
							</li>
						))}
						<button
							className="dropdown px-5 py-2 rounded-sm bg-inherit border-2 border-solid cursor-pointer border-[#272727] hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300"
							onMouseEnter={() => setShowDropdown(true)}
							onMouseLeave={() => setShowDropdown(false)}
							onFocus={() => setShowDropdown(true)}>
							Select Genre :
							{showDropdown && (
								<motion.ul
									className="top-10 md:top-12 flex flex-col gap-2 z-50"
									key={'dropdown'}
									initial={{ height: 0 }}
									animate={{ height: 'auto' }}
									transition={{ duration: 0.1 * GENRES.length }}>
									{GENRES.map((genre, index) => (
										<motion.li
											tabIndex={showDropdown && index + 6}
											className="w-full h-full flex"
											value=""
											key={index}
											initial={{
												opacity: 0,
												x: -100,
												filter: 'blur(5px)',
											}}
											animate={{ opacity: 1, x: 0, filter: 'blur(0)' }}
											transition={{ duration: 0.25, delay: 0.1 * index }}>
											<Link
												onClick={() => setCategory(genre)}
												to={`/genre/${genre}`}
												className="w-full p-2 text-center">
												{genre}
											</Link>
										</motion.li>
									))}
								</motion.ul>
							)}
						</button>

						<form
							className="flex"
							onSubmit={(e) => {
								e.preventDefault();
								navigate('/search');
								getData();
							}}>
							<input
								onFocus={() => setShowDropdown(false)}
								type="search"
								placeholder="Search on MovieMate..."
								className="px-3 border border-solid bg-[#070707] border-gray-700 py-2 text-gray-200 rounded-md outline-none"
								id={inputId}
								ref={input}
							/>
						</form>
					</ul>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
