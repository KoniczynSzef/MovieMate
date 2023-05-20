import { useContext, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import koniczyneczka from '../assets/logo.png';
import { LINKS } from '../data/assets';
import './Navbar.css';

import { fetchTopMovies } from '../data';
import MoviesContext from '../data/MoviesContext';

import '../App.css';
import Sidebar from './Sidebar';
import LinkNavbar from './LinkNavbar';

const Navbar = () => {
	const navigate = useNavigate();
	const input = useRef();

	const { setMovies, setQuery } = useContext(MoviesContext);

	const [typing, setTyping] = useState(false);

	const getData = async () => {
		const q = input.current.value;
		setQuery(q);
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
			<header className="container relative mx-auto flex items-center justify-between px-2 py-6">
				<Link
					tabIndex={1}
					to={'/'}
					role="link"
					className="logo ml-2 rounded outline-none transition-all duration-200 focus:outline-2 focus:outline-slate-400"
					title="MovieMate"
					onClick={() => {
						input.current.value = '';
						navigate('/');
					}}>
					<img src={koniczyneczka} alt="" className="max-w-[3rem] md:max-w-[5rem]" />
				</Link>

				<nav>
					<ul className="flex items-center gap-2 lg:gap-4">
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
							<label htmlFor="search-bar"></label>
							<input
								onFocus={() => setTyping(true)}
								onBlur={() => setTyping(false)}
								name="search-bar"
								id="search-bar"
								type="search"
								placeholder="Search on MovieMate..."
								className={`px-3 ${
									typing ? ` outline-2 outline-gray-700` : `outline-none`
								} rounded-md border border-solid
								border-gray-700 bg-[#070707] py-2 text-gray-200 outline-none outline-offset-4 transition-all duration-200`}
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
