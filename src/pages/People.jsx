import { useEffect, useState, useContext } from 'react';
import { fetchTrendingPeople } from '../data';
import MoviesContext from '../data/MoviesContext';
import { Link } from 'react-router-dom';

const People = () => {
	const { setPerson } = useContext(MoviesContext);

	const [persons, setPersons] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

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
			<div className="flex gap-4">
				{page > 1 && (
					<button
						className="bg-red-600 px-6 py-2"
						onClick={() => setPage((prev) => (prev -= 1))}>
						Prev page
					</button>
				)}

				{page < totalPages}

				<button
					className="bg-red-600 px-6 py-2"
					onClick={() => setPage((page) => (page += 1))}>
					Next page
				</button>
			</div>
		</>
	);
};

export default People;
