import { PropTypes } from 'prop-types';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Movie = ({ singleMovie }) => {
	const movie = singleMovie;

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	return movie.title ? (
		<motion.div
			className="min-h-screen"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}>
			<div className="container relative mx-auto my-16 flex px-4">
				<div className="flex flex-col gap-4 w-full">
					<div className="flex w-full justify-between">
						<h2 className="text-white text-5xl">{movie.title}</h2>
						<div className="flex flex-col gap-4">
							<h5 className="text-slate-300 text-2xl">
								MovieMate <span className="uppercase">rating</span>
							</h5>
							<div className="flex items-center gap-4">
								<StarIcon boxSize={'10'} color={'yellow.400'} />
								{movie.vote_average !== 0 ? (
									<div className="flex text-white text-3xl">
										<h3 className="font-semibold">
											{movie.vote_average.toFixed(1)}
										</h3>
										<span>/10</span>
									</div>
								) : (
										<div className="flex text-white text-3xl">
											<h3 className="font-semibold">
												Movie not rated yet.
											</h3>
										</div>
									)
								}
								
							</div>
						</div>
					</div>
					<h5 className="text-white text-xl">{movie.release_date.slice(0, 4)}</h5>
					<div className="flex gap-12 flex-col lg:flex-row">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt=""
							className="rounded-md md:max-w-[24rem]"
						/>
						<div className="ml-auto flex flex-col gap-12 justify-between">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
								alt=""
								className="ml-auto"
							/>
							<p className="text-white text-2xl leading-10 text-center border-2 border-slate-400 bg-[#272727] p-6 rounded-xl">
								{movie.overview}
							</p>
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

Movie.propTypes = {
	singleMovie: PropTypes.object,
};

export default Movie;
