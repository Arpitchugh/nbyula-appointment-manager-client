import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLogoutUser } from '../../action/auth.action';
import AwesomeCalendar from './components/calendar';

const { Title } = Typography;
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { currentUser, isLoggedIn } = useSelector(state => state.user);
	const [logoutLoading, setLogoutLoading] = useState(false);

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		const refreshToken = localStorage.getItem('refresh_token');

		if (!isLoggedIn && !accessToken && !refreshToken) navigate('/login');
	}, [dispatch, isLoggedIn, navigate]);

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
					<Title level={2}>Hi {currentUser?.name}!!!</Title>

					{isLoggedIn ? (
						<Button
							type='primary'
							onClick={logoutHandler}
							loading={logoutLoading}
						>
							Logout
						</Button>
					) : (
						<>
							<Button
								type='primary'
								onClick={logoutHandler}
								loading={logoutLoading}
							>
								<Link to='/signup'>Signup</Link>
							</Button>

							<Button
								type='primary'
								onClick={logoutHandler}
								loading={logoutLoading}
							>
								<Link to='/login'>Login</Link>
							</Button>
						</>
					)}
				</div>
				{isLoggedIn && <AwesomeCalendar />}
			</section>
		</>
	);
};

export default Home;
