import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import CreateEventModal from '../createEventModal';
import './index.less';

function AwesomeCalendar() {
	const localizer = momentLocalizer(moment);
	const DnDCalendar = withDragAndDrop(Calendar);
	const [isCreateEventModalVisible, setIsCreateEventModalVisible] =
		useState(false);
	const [createdCalendarEvent, setCreatedCalendarEvent] = useState({});

	const selectSlotHandler = event => {
		setCreatedCalendarEvent(event);
		setIsCreateEventModalVisible(true);
	};

	return (
		<>
			<section className='h-screen'>
				<CreateEventModal
					visible={isCreateEventModalVisible}
					setVisible={setIsCreateEventModalVisible}
					event={createdCalendarEvent}
				/>
				<DnDCalendar
					min={new Date(1970, 1, 1, 0)}
					scrollToTime={new Date(1970, 1, 1, 3)}
					localizer={localizer}
					// events={events}
					defaultView={Views.WEEK}
					onSelectSlot={selectSlotHandler}
					selectable
				/>
			</section>
		</>
	);
}

export default AwesomeCalendar;
