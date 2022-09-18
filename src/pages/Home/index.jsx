import React from 'react';
import { Typography } from 'antd';
import AwesomeCalendar from './components/calendar';

const { Title } = Typography;
const Home = () => {
	return (
		<>
			<main>
				<Title level={2}>Hi terraformer!!!</Title>
				<AwesomeCalendar />
			</main>
		</>
	);
};

export default Home;
