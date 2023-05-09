import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import './Sidebar.css';

import { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GENRES, LINKS } from '../data/assets';

import MoviesContext from '../data/MoviesContext';
import LinkNavbar from './LinkNavbar';
import { fetchTopMovies } from '../data';

const Sidebar = () => {
	const { setCategory, setMovies } = useContext(MoviesContext);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const MotionLink = motion(NavLink);

	const [isSmallerThanMd] = useMediaQuery('(max-height: 767px)');

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
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size={isSmallerThanMd ? 'full' : 'sm'}>
				<DrawerOverlay />
				<DrawerContent bg={'#070707'} position={'relative'}>
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
						justifyContent={'space-evenly'}
						flexDirection={'column'}
						overflowY={!isSmallerThanMd ? 'hidden' : 'auto'}>
						<ul className="nav-links-menu flex md:hidden z-50">
							{LINKS.map((link, idx) => (
								<LinkNavbar
									key={idx}
									getTypeOfMovie={getTypeOfMovie}
									link={link}
									idx={idx}
									onClose={onClose}
									isSidebar={true}
								/>
							))}
						</ul>

						<motion.ul
							className={`${
								isSmallerThanMd
									? 'flex-wrap flex-row w-full'
									: 'flex-nowrap flex-col w-64'
							} genre-links-menu relative flex gap-2 z-50 text-center items-center justify-center`}
							key={'dropdown'}
							transition={{ duration: 0.1 * GENRES.length }}>
							{GENRES.map((genre, index) => (
								<MotionLink
									initial={{
										x: -100,
										filter: 'blur(5px)',
									}}
									animate={{ x: 0, filter: 'blur(0)' }}
									transition={{ duration: 0.25, delay: 0.1 * index }}
									key={index}
									onClick={() => {
										setCategory(genre), onClose();
									}}
									to={`/genre/${genre}`}
									className={({ isActive }) =>
										`${isActive ? `bg-[#272727] pointer-events-none` : ''}
										 w-24 md:w-64 py-2 rounded-sm hover:bg-[#272727] text-white text-base lg:text-2xl capitalize font-semibold transition duration-300`
									}>
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
