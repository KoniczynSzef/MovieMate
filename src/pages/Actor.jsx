import { motion } from 'framer-motion';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import MoviesContext from '../data/MoviesContext';

const Actor = ({ person }) => {
	const { setSingleMovie } = useContext(MoviesContext);
	const knownFor = person.known_for;

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	return person.name ? (
		<motion.div
			className="min-h-screen"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}>
			<div className="container relative mx-auto my-16 flex px-4">
				<div className="flex flex-col gap-4 w-full">
					<div className="flex w-full justify-between">
						<h2 className="text-white text-5xl">{person.name}</h2>
					</div>

					<div className="flex flex-col md:flex-row gap-12 my-12">
						<img
							src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
							alt=""
							className="rounded-md max-w-[30rem] w-full bg-red-50 self-start"
						/>
						<div className="ml-auto md:max-w-[50%] flex flex-col items-center justify-center">
							<h3 className="text-center text-white text-3xl">Known for: </h3>
							<div className="flex gap-10 flex-col md:flex-wrap w-full my-12">
								{knownFor.map((movie, idx) => (
									<Link
										key={idx}
										onClick={() => setSingleMovie(movie)}
										to={`/${
											movie.media_type === 'movie' ? `movies` : `series`
										}/${movie.id}`}
										className="border-2 border-slate-400 rounded-md hover:bg-[#272727] hover:scale-105 transition duration-200">
										<img
											className="mx-auto rounded-md border-2 border-slate-400"
											src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
											alt=""
										/>
										<Text
											color={'white'}
											textAlign={'center'}
											py={'2'}
											fontSize={'2xl'}>
											<q>{movie.title}</q>
										</Text>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto p-4">
				<Box w={'full'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
					<Link to={'/'} className='ml-auto'>
						<Button
							colorScheme="green"						
							fontSize={'xl'}
							p={'6'}
							leftIcon={<ArrowBackIcon />} onClick={() => document.querySelector('#search-bar').value = ''}>
							Go to home page
						</Button>
					</Link>
				</Box>
			</div>
		</motion.div>
	) : (
		<Box
			h={'100vh'}
			display={'flex'}
			flexDir={'column'}
			alignItems={'center'}
			justifyContent={'space-evenly'}>
			<Text color={'white'} fontSize={'6xl'} textAlign={'center'}>
				Too many requests. Try one more time
			</Text>
			<Link to={'/'}>
				<Button colorScheme="green" size={'lg'}>
					See the best movies
				</Button>
			</Link>
		</Box>
	);
};

Actor.propTypes = {
	person: PropTypes.object,
};

export default Actor;
