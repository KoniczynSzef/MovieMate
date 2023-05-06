import { useEffect, useState, useContext } from 'react';
import { fetchTrendingPeople } from '../data';
import MoviesContext from '../data/MoviesContext';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const People = () => {
	const { setPerson } = useContext(MoviesContext);

	const [persons, setPersons] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const getPage = (page) => {
		setPage(page);
	};

	useEffect(() => {
		const getPeople = async () => {
			const [data, pages] = await fetchTrendingPeople(page);
			setTotalPages(pages);
			setPersons(data);
		};

		getPeople();
	}, [page]);
	return (
		<>
			<div className="flex bg-slate-400 flex-col">
				{persons.map((person, index) => (
					<Link to={`/people/${person.id}`} key={index} onClick={() => setPerson(person)}>
						{person.name}
					</Link>
				))}
			</div>
			<Pagination page={page} totalPages={totalPages} getPage={getPage} />
		</>
	);
};

export default People;
