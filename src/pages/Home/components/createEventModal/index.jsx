import { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../action/user.action';
import { createEvent } from '../../../../action/event.action';

function CreateEventModal({ visible, setVisible, event }) {
	const dispatch = useDispatch();
	const { allUsers } = useSelector(state => state.user);
	const [form] = Form.useForm();

	const [selectedGuests, setSelectedGuests] = useState([]);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const submitHandler = () => {
		const values = form.getFieldsValue();

		dispatch(
			createEvent({
				title: values.title,
				agenda: values.agenda,
				guests: selectedGuests,
				startTime: new Date(event.start).toISOString(),
				endTime: new Date(event.end).toISOString(),
			})
		);
	};

	return (
		<Modal
			open={visible}
			title='Enter Event Details'
			closable
			onCancel={() => {
				form.resetFields();
				setVisible(false);
			}}
			onOk={submitHandler}
		>
			<Form layout='vertical' form={form} onFinish={submitHandler}>
				<Form.Item label='Title' name='title'>
					<Input placeholder='salary++' />
				</Form.Item>
				<Form.Item label='Agenda' name='agenda'>
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
						{allUsers?.map(user => (
							<Select.Option key={user._id} value={user._id} label={user.name}>
								{`${user.name} <${user.email}>`}
							</Select.Option>
						))}
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
