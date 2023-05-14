import { PropTypes } from 'prop-types';
import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Movie = ({ singleMovie }) => {
	const movie = singleMovie;

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
								<div className="flex text-white text-3xl">
									<h3 className="font-semibold">
										{movie.vote_average.toFixed(1)}
									</h3>
									<span>/10</span>
								</div>
							</div>
						</div>
					</div>
					<h5 className="text-white text-xl">{movie.release_date.slice(0, 4)}</h5>
					<div className="flex gap-12 flex-col md:flex-row">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt=""
							className="rounded-md md:max-w-[24rem]"
						/>
						<div className="ml-auto md:max-w-[50%] flex flex-col gap-12 md:gap-0 justify-between">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
								alt=""
								className="ml-auto"
							/>
							<p className="text-white text-2xl leading-10 text-center md:text-right">
								{movie.overview}
							</p>
						</div>
					</div>
				</div>
			</div>
			<Box w={'full'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
				<Link to={'/'}>
					<Button
						colorScheme="green"
						fontSize={'xl'}
						p={'6'}
						rightIcon={<ArrowForwardIcon />}>
						Go to home page
					</Button>
				</Link>
			</Box>
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
