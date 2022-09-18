import { Form, Input, Modal, Select } from 'antd';
import propTypes from 'prop-types';

function CreateEventModal({ visible, setVisible, event }) {
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
					<Select mode='multiple' placeholder='Select guests'>
						<Select.Option value='user1'>user1</Select.Option>
						<Select.Option value='user2'>user2</Select.Option>
						<Select.Option value='user3'>user3</Select.Option>
						<Select.Option value='user4'>user4</Select.Option>
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
