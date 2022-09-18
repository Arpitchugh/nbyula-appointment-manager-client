import { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../action/user.action';

function CreateEventModal({ visible, setVisible, event }) {
	const dispatch = useDispatch();
	const { allUsers } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<Modal
			open={visible}
			title='Enter Event Details'
			closable
			onCancel={() => setVisible(false)}
		>
			<Form layout='vertical'>
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
