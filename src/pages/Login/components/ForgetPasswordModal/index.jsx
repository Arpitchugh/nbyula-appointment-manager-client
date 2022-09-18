import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import {
	patchResetPassword,
	postForgotPassword,
} from '../../../../action/auth.action';

const ForgetPasswordModal = ({ isVisible, setIsVisible }) => {
	const dispatch = useDispatch();

	const [passwordResetCodeSent, setPasswordResetCodeSent] = useState(false);
	const [verifyAccountLoading, setVerifyAccountLoading] = useState(false);
	const [verifyCodeLoading, setVerifyCodeLoading] = useState(false);
	const [form] = Form.useForm();

	const validateMessage = {
		required: '${label} is required!',
		types: {
			email: '${label} is not a valid email!',
			number: '${label} is not a valid number!',
		},
	};

	const sendVerificationEmail = async () => {
		setVerifyCodeLoading(true);

		const values = form.getFieldsValue();
		await dispatch(postForgotPassword({ email: values.email }))
			.then(() => {
				message.success('Password reset code sent to email');
				setVerifyCodeLoading(false);
				setPasswordResetCodeSent(true);
			})
			.finally(setVerifyCodeLoading(false));
	};

	const submitHandler = () => {
		setVerifyAccountLoading(true);
		try {
			const values = form.getFieldsValue();
			dispatch(
				patchResetPassword(
					{
						email: values.email,
						passwordResetCode: values.passwordResetCode,
					},
					{ password: values.password, cpassword: values.cpassword }
				)
			).then(() => {
				setVerifyAccountLoading(false);
				message.success('Password reset successfully');
			});
		} catch (err) {
			message.error(err);
		}
	};

	const cancelHandler = () => {
		form.resetFields();
		setIsVisible(false);
	};

	return (
		<Modal
			title='Create new Account!'
			open={isVisible}
			closable={false}
			destroyOnClose
			centered
			okText='Change Password'
			onCancel={cancelHandler}
			footer={
				<>
					<Button type='ghost' onClick={cancelHandler}>
						Cancel
					</Button>
					<Button
						type='primary'
						onClick={submitHandler}
						disabled={!passwordResetCodeSent}
						loading={verifyAccountLoading}
					>
						Change Password
					</Button>
				</>
			}
		>
			<Form form={form} layout='vertical' onFinish={submitHandler}>
				<Form.Item
					label='Email'
					name='email'
					rules={[{ required: true, type: 'email' }]}
				>
					<div className='!flex !flex-row items-center'>
						<Input placeholder='terraformers@select-me.com' size='large' />
						<Button
							type='primary'
							className='ml-2'
							onClick={sendVerificationEmail}
							loading={verifyCodeLoading}
						>
							{passwordResetCodeSent ? 'Resend Code' : 'Send code'}
						</Button>
					</div>
				</Form.Item>

				<Form.Item
					label='Verification Code'
					name='passwordResetCode'
					rules={[
						{ required: true, message: 'Password reset code code is required' },
					]}
				>
					<Input placeholder='sent to email' />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[{ required: true }]}
				>
					<Input.Password placeholder='kr lo' size='large' />
				</Form.Item>

				<Form.Item
					label='Confirm Password'
					name='cpassword'
					rules={[
						{ required: true },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Password and confirm password do not match')
								);
							},
						}),
					]}
					dependencies={['password']}
				>
					<Input.Password placeholder='ab kr bhi lo !!' size='large' />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ForgetPasswordModal;
