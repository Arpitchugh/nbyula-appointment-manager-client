import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLogoutUser } from '../../action/auth.action';
import AwesomeCalendar from './components/calendar';

const { Title } = Typography;
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [logoutLoading, setLogoutLoading] = useState(false);

	const logoutHandler = async () => {
		try {
			setLogoutLoading(true);
			await dispatch(getLogoutUser()).then(() => {
				navigate('/login');
			});
		} finally {
			setLogoutLoading(false);
		}
	};
	return (
		<>
			<section className='m-5'>
				<div className='flex justify-between mt-5'>
					<Title level={2}>Hi terraformer!!!</Title>
					<Button
						type='primary'
						onClick={logoutHandler}
						loading={logoutLoading}
					>
						Logout
					</Button>
				</div>
				<AwesomeCalendar />
			</section>
		</>
	);
};

export default Home;
