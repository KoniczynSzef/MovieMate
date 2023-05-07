import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	useDisclosure,
} from '@chakra-ui/react';

import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GENRES, LINKS } from '../data/assets';

import MoviesContext from '../data/MoviesContext';
import LinkNavbar from './LinkNavbar';
import { fetchTopMovies } from '../data';

const Sidebar = () => {
	const { setCategory, setMovies } = useContext(MoviesContext);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const MotionLink = motion(Link);

	const getTypeOfMovie = async (type) => {
		if (type === 'movies') {
			const data = await fetchTopMovies('movie');
			setMovies(data);
		} else if (type === 'series') {
			const data = await fetchTopMovies('tv');
			setMovies(data);
		}
	};

	return (
		<>
			<Button
				ref={btnRef}
				color={'white'}
				_hover={{ bg: '#272727' }}
				bg={'transparent'}
				onClick={onOpen}
				fontSize={'2xl'}>
				<HamburgerIcon />
			</Button>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent bg={'#070707'} position={'relative'} overflowY={'hidden'}>
					<DrawerCloseButton
						color={'red'}
						size={'lg'}
						position={'absolute'}
						right={'0'}
						_hover={{ bg: '#272727' }}
					/>

					<DrawerBody
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						flexDirection={'column'}
						overflowY={'hidden'}
						gap={'5rem'}>
						<ul className="flex md:hidden">
							{LINKS.map((link, idx) => (
								<LinkNavbar
									key={idx}
									getTypeOfMovie={getTypeOfMovie}
									link={link}
									idx={idx}
								/>
							))}
						</ul>

						<motion.ul
							className="top-10 md:top-12 flex flex-col gap-2 z-50 w-64 text-center"
							key={'dropdown'}
							transition={{ duration: 0.1 * GENRES.length }}>
							{GENRES.map((genre, index) => (
								<MotionLink
									initial={{
										opacity: 0,
										x: -100,
										filter: 'blur(5px)',
									}}
									animate={{ opacity: 1, x: 0, filter: 'blur(0)' }}
									transition={{ duration: 0.25, delay: 0.1 * index }}
									key={index}
									onClick={() => {
										setCategory(genre), onClose();
									}}
									to={`/genre/${genre}`}
									className="w-64 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300">
									{genre}
								</MotionLink>
							))}
						</motion.ul>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Sidebar;
