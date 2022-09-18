import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../action/user.action';
import { createEvent, getUserEvents } from '../../../../action/event.action';

function CreateEventModal({ visible, setVisible, event }) {
	const dispatch = useDispatch();
	const { allUsers, currentUser } = useSelector(state => state.user);
	const [form] = Form.useForm();

	const [selectedGuests, setSelectedGuests] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const submitHandler = async () => {
		setLoading(true);
		const values = form.getFieldsValue();

		await dispatch(
			createEvent({
				type: 'appointment',
				title: values.title,
				agenda: values.agenda,
				guests: selectedGuests,
				start: new Date(event.start).toString(),
				end: new Date(event.end).toString(),
			})
		);
		setSelectedGuests([]);
		form.resetFields();
		setVisible(false);
		setLoading(false);
		dispatch(getUserEvents());
	};

	const blockTimeHandler = async () => {
		setLoading(true);
		await dispatch(
			createEvent({
				type: 'block',
				title: 'Block Time',
				agenda: 'I am not available',
				start: new Date(event.start).toString(),
				end: new Date(event.end).toString(),
			})
		);
		dispatch(getUserEvents());
		setLoading(false);
		setVisible(false);
	};

	return (
		<Modal
			open={visible}
			className='!pb-0'
			title='Enter Event Details'
			onCancel={() => {
				form.resetFields();
				setVisible(false);
			}}
			closable
			footer={
				<div className='flex justify-between'>
					<Button
						onClick={blockTimeHandler}
						type='ghost'
						danger
						loading={loading}
					>
						Block Time
					</Button>
					<div className='flex'>
						<Button
							onClick={() => {
								form.resetFields();
								setVisible(false);
							}}
							type='default'
						>
							cancel
						</Button>
						<Button onClick={submitHandler} type='primary' loading={loading}>
							ok
						</Button>
					</div>
				</div>
			}
		>
			<Form layout='vertical' form={form} onFinish={submitHandler}>
				<Form.Item label='Title' name='title' rules={[{ required: true }]}>
					<Input placeholder='salary++' />
				</Form.Item>
				<Form.Item label='Agenda' name='agenda' rules={[{ required: true }]}>
					<Input.TextArea
						placeholder='lets talk about increasing my salary'
						rows={4}
					/>
				</Form.Item>
				<Form.Item label='Guests'>
					<Select
						mode='multiple'
						placeholder='Select guests'
						optionLabelProp='label'
						showSearch
						optionFilterProp='children'
						onChange={value => setSelectedGuests(value)}
					>
						{allUsers?.map(
							user =>
								user.email !== currentUser.email && (
									<Select.Option
										key={user._id}
										value={user._id}
										label={user.name}
									>
										{`${user.name} <${user.email}>`}
									</Select.Option>
								)
						)}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
}

CreateEventModal.propTypes = {
	/**
	 * Whether the modal is visible or not
	 */
	visible: propTypes.bool.isRequired,

	/**
	 * Function which will update the `visible` state
	 */
	setVisible: propTypes.func.isRequired,

	/**
	 * Event provided by the calendar
	 */
	event: propTypes.object.isRequired,
};

export default CreateEventModal;
