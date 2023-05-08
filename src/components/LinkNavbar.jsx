import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkNavbar = ({ link, idx, getTypeOfMovie }) => {
	return (
		<li key={idx}>
			<NavLink
				tabIndex={idx + 2}
				onClick={() => getTypeOfMovie(link)}
				to={`/${link}`}
				className={({ isActive }) =>
					` ${
						isActive ? `bg-[#272727] pointer-events-none` : ``
					} px-5 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300`
				}>
				{link}
			</NavLink>
		</li>
	);
};

LinkNavbar.propTypes = {
	link: PropTypes.string,
	idx: PropTypes.number,
	getTypeOfMovie: PropTypes.func,
};

export default LinkNavbar;
