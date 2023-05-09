import { Button, Container, HStack, useMediaQuery } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const Pagination = ({ page, getPage, totalPages }) => {
	const pages = [page + 1, page + 2, page + 3];

	const [isSmallerThanMd] = useMediaQuery('(max-width: 767px)');

	return (
		<Container mx={'auto'} maxW={{ base: 'container.md', md: 'full' }} bg={'#272727'}>
			<HStack w={'full'} justifyContent={'center'} spacing={'8'} py={'8'}>
				<Button
					isDisabled={page === 1 && true}
					leftIcon={<ArrowBackIcon />}
					colorScheme="red"
					onClick={() => getPage(page - 1)}>
					Previous page
				</Button>
				<HStack spacing={'2'}>
					<Button
						isDisabled={page === 1 && true}
						hidden={isSmallerThanMd ? true : false}
						key={1}
						onClick={() => getPage(1)}
						colorScheme={'red'}
						color={'white'}>
						1
					</Button>
					{pages.map((pageNum) => (
						<Button
							hidden={isSmallerThanMd ? true : false}
							isDisabled={pageNum > totalPages || pageNum === page ? true : false}
							key={pageNum}
							onClick={() => getPage(pageNum)}
							bg={'twitter.800'}
							color={'white'}
							_hover={{ bg: 'twitter.900' }}>
							{pageNum}
						</Button>
					))}
					<Button
						isDisabled={page === totalPages && true}
						hidden={isSmallerThanMd ? true : false}
						key={totalPages}
						onClick={() => getPage(totalPages)}
						colorScheme={'teal'}
						color={'white'}>
						{totalPages}
					</Button>
				</HStack>
				<Button
					isDisabled={page === totalPages && true}
					colorScheme="teal"
					rightIcon={<ArrowForwardIcon />}
					onClick={() => getPage(page + 1)}>
					Next page
				</Button>
			</HStack>
		</Container>
	);
};

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	getPage: PropTypes.func,
	totalPages: PropTypes.number.isRequired,
};

export default Pagination;
