import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';

const Person = ({ person, page, index }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, [page, person]);

	return (
		person.profile_path && (
			<motion.div
				className="card h-[28rem] w-[15rem] relative rounded-md border-2 border-slate-400 hover:scale-[1.05] transition duration-300 overflow-hidden hover:bg-[#272727]"
				initial={{ opacity: 0 }}
				animate={visible ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.25, delay: 0.1 * index }}>
				<Link to={`/actors/${person.id}`} className="link-wrapper">
					<Image
						borderRadius={'md'}
						as={motion.img}
						src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
						fallback={
							<Box
								_hover={{ transform: 'scale(1.1)' }}
								transition={'300ms all ease-in-out'}
								h={'full'}
								display={'grid'}
								gap={'1rem'}
								placeContent={'center'}
								border={'2px solid white'}
								borderRadius={'md'}>
								<Text
									fontSize={'3xl'}
									color={'white'}
									mx={'auto'}
									fontWeight={'bold'}>
									{person.name}
								</Text>
								<Text mx={'auto'} fontSize={'xl'} color={'white'}>
									Image not found
								</Text>
							</Box>
						}
						w={'full'}
						outlineOffset={'2px'}
						_focusVisible={{ outline: '2px solid #272727' }}
						transition={'300ms all ease-in-out'}
					/>
					<Box
						h={'6rem'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}>
						{person.name ? (
							<Text
								className="person-text"
								textAlign={'center'}
								color={'white'}
								fontSize={'xl'}
								fontWeight={'600'}
								h={'100%'}
								px={'2'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}>
								{person.name}
							</Text>
						) : (
							<Text
								textAlign={'center'}
								color={'white'}
								fontSize={'2xl'}
								py={'4'}
								px={'2'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}>
								Movie not found
							</Text>
						)}
					</Box>
				</Link>
			</motion.div>
		)
	);
};

Person.propTypes = {
	person: PropTypes.object.isRequired,
	index: PropTypes.number,
	page: PropTypes.number,
};

export default Person;
