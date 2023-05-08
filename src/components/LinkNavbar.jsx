import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const LinkNavbar = ({ link, idx, getTypeOfMovie }) => {
	const [disabled, setDisabled] = useState(false);
	const [clickedLink, setClickedLink] = useState(0);
	const prevLink = useRef();

	const handleClick = (e) => {
		e.target.blur();
		setDisabled(true);
		setClickedLink(e.target.tabIndex);
		getTypeOfMovie(link);
	};

	useEffect(() => {
		prevLink.current = clickedLink;

		console.log(prevLink.current);
	}, [clickedLink]);

	return (
		<li key={idx}>
			<NavLink
				tabIndex={prevLink === idx + 2 ? -1 : idx + 2}
				onClick={handleClick}
				to={`/${link}`}
				className={`link-navbar ${
					prevLink === idx + 2 ? `bg-[#272727] pointer-events-none` : ``
				} px-5 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300`}>
				{link}
			</NavLink>
		</li>
	);
};

LinkNavbar.propTypes = {
	link: PropTypes.string,
	idx: PropTypes.number,
	getTypeOfMovie: PropTypes.func,
	setDisabled: PropTypes.func,
	disabled: PropTypes.bool,
};

export default LinkNavbar;
