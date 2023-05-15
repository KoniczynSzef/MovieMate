import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [seconds, setSeconds] = useState(1000);

	const reduceSeconds = () => {
		setSeconds((prev) => (prev -= 1));
	};

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
	}, []);

	useEffect(() => {
		let interval = setInterval(reduceSeconds, 1);

		setTimeout(() => {
			toast({
				title: 'Page not found',
				description: `You're being redirected to homepage in ${(seconds / 1000).toFixed(
					0,
				)} second`,
				duration: seconds,
				isClosable: true,
				position: 'bottom',
				status: 'error',
			});
		}, 300);

		setTimeout(() => {
			navigate('/');
		}, seconds);

		clearInterval(interval);
	}, []);

	return (
		<div>
			<div className="text-white text-4xl my-16 text-center">Not Found</div>;
		</div>
	);
};

export default NotFound;
