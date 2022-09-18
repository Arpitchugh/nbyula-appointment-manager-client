import { useState } from 'react';
import { Button, List, message, Modal, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../../../../../action/event.action';

function ViewEvent({ visible, setVisible, event }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const deleteEventHandler = async () => {
		await dispatch(deleteEvent(event._id))
			.then(() => message.success('event deleted successfully'))
			.finally(() => {
				setLoading(false);
				setVisible(false);
			});
	};
	return (
		<Modal
			open={visible}
			title={event.title}
			closable
			onCancel={() => setVisible(false)}
			footer={null}
		>
			<div className='flex items-center mb-3'>
				<Typography.Title level={4} className='!m-0'>
					Title:
				</Typography.Title>
				<Typography.Title level={5} className='!m-0 !ml-3'>
					{event.title}
				</Typography.Title>
			</div>

			<div className='flex items-center mb-3'>
				<Typography.Title level={4} className='!m-0'>
					Agenda:
				</Typography.Title>
				<Typography.Paragraph className='!m-0 !ml-3'>
					{event.agenda}
				</Typography.Paragraph>
			</div>

			<div className='flex items-center mb-3'>
				<Typography.Title level={4} className='!m-0'>
					Organizer:
				</Typography.Title>
				<Typography.Paragraph className='!m-0 !ml-3'>
					{event?.organizer?.name}
				</Typography.Paragraph>
			</div>

			<div className='flex flex-col  justify-center mb-3'>
				<Typography.Title level={4} className='!m-0'>
					Guests:
				</Typography.Title>
				<List
					className='!m-0 !ml-3'
					dataSource={event.guests}
					renderItem={(guest, i) => (
						<List.Item>
							<Typography.Text>
								{`${i + 1})`} {guest?.name} {`<${guest?.email}>`}
							</Typography.Text>
						</List.Item>
					)}
				/>
			</div>
			<Button
				danger
				loading={loading}
				type='ghost'
				onClick={() => {
					setLoading(true);
					deleteEventHandler();
				}}
			>
				delete event
			</Button>
		</Modal>
	);
}

export default ViewEvent;
