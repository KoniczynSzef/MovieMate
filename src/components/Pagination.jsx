import { Button, HStack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const Pagination = ({ page, getPage, totalPages }) => {
	const pages = [page, page + 1, page + 2, page + 3, page + 4];
	return (
		<HStack w={'full'} bg={'#272727'} justifyContent={'center'} spacing={'8'} py={'8'}>
			<Button
				isDisabled={page === 1 && true}
				leftIcon={<ArrowBackIcon />}
				colorScheme="red"
				onClick={() => getPage((prev) => (prev -= 1))}>
				Previous page
			</Button>
			<HStack spacing={'2'}>
				{pages.map((pageNum) => (
					<Button
						isDisabled={
							(page === 1 && pageNum === page) ||
							(page === totalPages && pageNum === totalPages && true)
						}
						key={pageNum}
						onClick={() => getPage(pageNum)}
						bg={'twitter.800'}
						color={'white'}
						_hover={{ bg: 'twitter.900' }}>
						{pageNum}
					</Button>
				))}
			</HStack>
			<Button
				isDisabled={page === totalPages && true}
				colorScheme="teal"
				rightIcon={<ArrowForwardIcon />}
				onClick={() => getPage((prev) => (prev += 1))}>
				Next page
			</Button>
		</HStack>
	);
};

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	getPage: PropTypes.func,
	totalPages: PropTypes.number.isRequired,
};

export default Pagination;
