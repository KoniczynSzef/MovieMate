import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkNavbar = ({ link, idx, getTypeOfMovie, onClose, isSidebar }) => {
	const handleClick = (e) => {
		e.target.blur();
		getTypeOfMovie(link);
	};

	return (
		<li key={idx}>
			<NavLink
				role='link'
				tabIndex={idx + 2}
				onClick={!isSidebar ? handleClick : onClose}
				to={`/${link}`}
				className={`px-5 py-2 rounded-sm text-white text-base lg:text-2xl
				capitalize font-semibold transition-all duration-300 hover:bg-[#272727] outline-none focus:outline focus:outline-slate-400 focus:bg-[#474747]`}>
				{link}
			</NavLink>
		</li>
	);
};

LinkNavbar.propTypes = {
	link: PropTypes.string,
	idx: PropTypes.number,
	getTypeOfMovie: PropTypes.func,
	onClose: PropTypes.func,
	isSidebar: PropTypes.bool,
};

export default LinkNavbar;
