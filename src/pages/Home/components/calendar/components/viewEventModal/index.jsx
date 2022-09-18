import { List, Modal, Typography } from 'antd';

function ViewEvent({ visible, setVisible, event }) {
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
		</Modal>
	);
}

export default ViewEvent;
