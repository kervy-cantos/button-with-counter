import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Home = () => {
	const [count, setCount] = useState(0);
	const [isUpdated, setIsUpdated] = useState(false);

	useEffect(() => {
		if (!isUpdated) {
			socket.emit('updateCount');
			updateCount();
		}
	}, []);

	const updateCount = () => {
		socket.on('updateCount', newCount => {
			setCount(newCount);
			setIsUpdated(true);
		});
	};
	const increment = () => {
		socket.emit('increment');
	};
	return (
		<>
			<div>
				<h2>Counter</h2>
				<p>Count: {count}</p>

				<button className='bg-primary' onClick={increment}>
					Add
				</button>
			</div>
		</>
	);
};

export default Home;
