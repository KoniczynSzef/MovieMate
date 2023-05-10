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
				className="card w-64 rounded-md border-2 border-slate-100 hover:scale-[1.05] hover:bg-[#272727] transition duration-300"
				initial={{ opacity: 0 }}
				animate={visible ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.25, delay: 0.1 * index }}>
				<Link to={`/people/${person.id}`} className="link-wrapper">
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
								<Text fontSize={'3xl'} color={'white'} mx={'auto'}>
									<cite>{person.name}</cite>
								</Text>
								<Text mx={'auto'} fontSize={'xl'} color={'white'}>
									Image not found
								</Text>
							</Box>
						}
						w={'64'}
						outlineOffset={'2px'}
						_focusVisible={{ outline: '2px solid #272727' }}
						transition={'300ms all ease-in-out'}
					/>
					<Text
						textAlign={'center'}
						color={'white'}
						fontSize={'2xl'}
						py={'4'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}>
						<cite>{person.name}</cite>
					</Text>
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
