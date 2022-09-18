import React, { useCallback, useState } from 'react';
import { Button, Typography } from 'antd';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './index.less';

const { Title } = Typography;
const Home = () => {
	const localizer = momentLocalizer(moment);
	const DnDCalendar = withDragAndDrop(Calendar);
	const [events, setEvents] = useState([]);

	console.log(events);

	const selectSlotHandler = event => {
		setEvents(prevState => [
			...prevState,
			{ start: event.start, end: event.end },
		]);
	};

	return (
		<>
			<section>
				<Title level={2}>Hi terraformer!!!</Title>
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
