import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect, useContext } from 'react';
import MoviesContext from './../data/MoviesContext';

const Serie = ({ singleSeries }) => {
	const serie = singleSeries;

	const { setQuery } = useContext(MoviesContext)

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	return serie.name ? (
		<motion.div
			className="min-h-screen"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}>
			<div className="container relative mx-auto my-16 flex px-4">
				<div className="flex flex-col gap-4 w-full">
					<div className="flex w-full justify-between">
						<h2 className="text-white text-5xl">{serie.name}</h2>
						<div className="flex flex-col gap-4">
							<h5 className="text-slate-300 text-2xl">
								MovieMate <span className="uppercase">rating</span>
							</h5>
							<div className="flex items-center gap-4">
								<StarIcon boxSize={'10'} color={'yellow.400'} />
								<div className="flex text-white text-3xl">
									<h3 className="font-semibold">
										{serie.vote_average.toFixed(1)}
									</h3>
									<span>/10</span>
								</div>
							</div>
						</div>
					</div>
					<h5 className="text-white text-xl">{serie.first_air_date.slice(0, 4)}</h5>
					<div className="flex gap-12">
						<img
							src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
							alt=""
							className="rounded-md max-w-[24rem]"
						/>
						<div className="ml-auto max-w-[50%] flex flex-col justify-between">
							<img
								src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`}
								alt=""
								className="ml-auto"
							/>
							<p className="text-white text-2xl leading-10 text-center border-2 border-slate-400 bg-[#272727] p-6 rounded-xl">
								{serie.overview}
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
						leftIcon={<ArrowBackIcon />} onClick={() => setQuery('')}>
						Go to home page
					</Button>
				</Link>
			</Box>
		</motion.div>
	) : (
		<Box
			maxW={'100vw'}
			h={'100vh'}
			display={'flex'}
			flexDir={'column'}
			alignItems={'center'}
			justifyContent={'space-evenly'}>
			<Text color={'white'} fontSize={{ base: '3xl', lg: '6xl' }} textAlign={'center'}>
				Too many requests. Try one more time
			</Text>
			<Link to={'/'}>
				<Button colorScheme="green" size={['md', 'lg']} fontSize={'3xl'}>
					See the best movies
				</Button>
			</Link>
		</Box>
	);
};

Serie.propTypes = {
	singleSeries: PropTypes.object,
};

export default Serie;
