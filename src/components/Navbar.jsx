import { useContext, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import logo from '../assets/vite.svg';
import { LINKS } from '../data/assets';
import './Navbar.css';

import { fetchData, fetchTopMovies } from '../data';
import MoviesContext from '../data/MoviesContext';

import '../App.css';
import Sidebar from './Sidebar';
import LinkNavbar from './LinkNavbar';

const Navbar = () => {
	const navigate = useNavigate();

	const input = useRef();

	const { setMovies, setQuery } = useContext(MoviesContext);

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
						<div className="hidden md:flex">
							{LINKS.map((link, idx) => (
								<LinkNavbar
									key={idx}
									getTypeOfMovie={getTypeOfMovie}
									link={link}
									idx={idx}
								/>
							))}
						</div>

						<form
							className="flex"
							onSubmit={(e) => {
								e.preventDefault();
								navigate('/search');
								getData();
							}}>
							<input
								type="search"
								placeholder="Search on MovieMate..."
								className="px-3 border border-solid bg-[#070707] border-gray-700 py-2 text-gray-200 rounded-md outline-none"
								ref={input}
							/>
						</form>
						<Sidebar />
					</ul>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
