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

			setTimeout(() => {
				setIsLoading(false);
			}, 350);
		};

		getPeople();
	}, [page]);

	return !isLoading ? (
		<div>
			<div className="container mx-auto flex flex-col gap-32 my-32">
				<h1 className="text-center text-4xl text-white">Most popular actors</h1>
				<div className="flex flex-wrap gap-16 justify-center items-center">
					{persons.map((person, index) => (
						<Person person={person} index={index} key={index} />
					))}
				</div>
			</div>
			<Pagination page={page} totalPages={totalPages} getPage={handlePageChange} />
		</div>
	) : (
		<div className="h-screen flex items-center justify-center">
			<Spinner size={'xl'} color="green.600" mb={'40'} />
		</div>
	);
};

export default People;
