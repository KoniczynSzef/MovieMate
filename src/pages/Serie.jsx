import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Serie = ({ singleSeries }) => {
	const serie = singleSeries;

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
				<div className="flex w-full flex-col gap-4">
					<div className="flex w-full justify-between">
						<h2 className="text-5xl text-white">{serie.name}</h2>
						<div className="flex flex-col gap-4">
							<h5 className="text-2xl text-slate-300">
								MovieMate <span className="uppercase">rating</span>
							</h5>
							<div className="flex items-center gap-4">
								<StarIcon boxSize={'10'} color={'yellow.400'} />
								<div className="flex text-3xl text-white">
									<h3 className="font-semibold">
										{serie.vote_average.toFixed(1)}
									</h3>
									<span>/10</span>
								</div>
							</div>
						</div>
					</div>
					<h5 className="text-xl text-white">{serie.first_air_date.slice(0, 4)}</h5>
					<div className="flex flex-col gap-12 lg:flex-row">
						<img
							src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
							alt=""
							className="max-w-[24rem] rounded-md"
						/>
						<div className="ml-auto flex flex-col justify-between gap-12">
							<img
								src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`}
								alt=""
								className="ml-auto"
							/>
							<p className="rounded-xl border-2 border-slate-400 bg-[#272727] p-6 text-center text-2xl leading-10 text-white">
								{serie.overview}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto p-4">
				<Box w={'full'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
					<Link to={'/'} className="ml-auto">
						<Button
							colorScheme="green"
							fontSize={'xl'}
							p={'6'}
							leftIcon={<ArrowBackIcon />}
							onClick={() => (document.querySelector('#search-bar').value = '')}>
							Go to home page
						</Button>
					</Link>
				</Box>
			</div>
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
