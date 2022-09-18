import React, { useCallback, useState } from 'react';
import { Button, Typography } from 'antd';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../action/auth.action';

const { Title } = Typography;
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const localizer = momentLocalizer(moment);
	const DnDCalendar = withDragAndDrop(Calendar);
	const [events, setEvents] = useState([]);
	const [logoutLoading, setLogoutLoading] = useState(false);

	const selectSlotHandler = event => {
		setEvents(prevState => [
			...prevState,
			{ start: event.start, end: event.end },
		]);
	};
	const logoutHandler = async () => {
		try {
			setLogoutLoading(true);
			await dispatch(logoutUser()).then(() => {
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
				<div className='h-screen'>
					<DnDCalendar
						min={new Date(1970, 1, 1, 0)}
						scrollToTime={new Date(1970, 1, 1, 3)}
						localizer={localizer}
						events={events}
						defaultView={Views.WEEK}
						onSelectSlot={selectSlotHandler}
						selectable
					/>
				</div>
			</section>
		</>
	);
};

export default Home;
