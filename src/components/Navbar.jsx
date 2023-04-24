import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../public/vite.svg'

import { LINKS } from '../data/assets'

import './Navbar.css'

const Navbar = () => {
	return (
		<div className="bg-[#070707]">
			<header className="container relative mx-auto py-6 flex items-center justify-between px-2">
				<Link to={'/'} className="logo transition duration-200">
					<img src={logo} alt="" />
				</Link>

				<nav>
					<ul className="flex gap-4 items-center">
						{LINKS.map((link, idx) => (
							<li key={idx}>
								<Link
									to={`/${link}`}
									className="px-5 py-2 rounded-sm hover:bg-[#272727] text-white text-xl capitalize font-semibold transition duration-300">
									{link}
								</Link>
							</li>
						))}

						<form className="flex" onSubmit={(e) => e.preventDefault()}>
							<input
								type="search"
								placeholder="Search on MovieMate..."
								className="px-3 bg-transparent border border-solid border-gray-700 py-2 text-gray-200 rounded-md outline-none"
							/>
						</form>
					</ul>
				</nav>
			</header>
		</div>
	)
}

export default Navbar
