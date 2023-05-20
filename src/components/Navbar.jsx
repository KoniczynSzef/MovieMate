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

	const [typing, setTyping] = useState(false)

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
			<header className="container relative mx-auto py-6 flex items-center justify-between px-2">
				<Link
					tabIndex={1}
					to={'/'}
					role='link'
					className="logo transition-all duration-200 ml-2 outline-none rounded focus:outline-2 focus:outline-slate-400"
					title="MovieMate"
					onClick={() => {
						input.current.value = '';
						navigate('/');
					}}>
					<img src={koniczyneczka} alt="" className="scale-100 max-w-[5rem]" />
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
								<label htmlFor="search-bar"></label>
							<input
								onFocus={() => setTyping(true)} onBlur={() => setTyping(false)}
								name='search-bar'
								id='search-bar'
								type="search"
								placeholder="Search on MovieMate..."
								className={`px-3 ${typing ? `px-5 outline-2 outline-gray-700` : `px-3 outline-none`} border border-solid bg-[#070707]
								border-gray-700 py-2 text-gray-200 transition-all duration-200 rounded-md outline-none outline-offset-4`}
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
