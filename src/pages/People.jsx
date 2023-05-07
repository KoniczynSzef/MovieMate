import { useEffect, useState } from 'react';
import { fetchTrendingPeople } from '../data';
import Pagination from '../components/Pagination';

import Person from './Person';
import { Spinner } from '@chakra-ui/react';

const People = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [persons, setPersons] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			window.scrollTo({ behavior: 'smooth', top: 0 });
			setTimeout(() => setPage(newPage), 500);
		}
	};

	useEffect(() => {
		const getPeople = async () => {
			setIsLoading(true);
			const [data, pages] = await fetchTrendingPeople(page);
			setTotalPages(pages);
			setPersons(data);
			setIsLoading(false);
		};

		getPeople();
	}, [page]);

	return !isLoading ? (
		<div>
			<div className="container mx-auto flex flex-col gap-16 my-16">
				<div className="flex flex-wrap gap-12 justify-center items-center">
					{persons.map((person, index) => (
						<Person person={person} index={index} key={index} />
					))}
				</div>
			</div>
			<Pagination page={page} totalPages={totalPages} getPage={handlePageChange} />
		</div>
	) : (
		<Spinner size={'xl'} color="purple.600" position={'absolute'} inset={'0'} m={'auto'} />
	);
};

export default People;
