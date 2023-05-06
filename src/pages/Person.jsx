import PropTypes from 'prop-types';

const Person = ({ person }) => {
	return (
		<div>
			{person.name}
			{person.id}
		</div>
	);
};

Person.propTypes = {
	person: PropTypes.object.isRequired,
};

export default Person;
