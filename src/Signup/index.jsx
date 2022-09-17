import { React, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import api from '../util/api.util';

const Signup = () => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const submitHandler = values => {
		setLoading(true);
		api
			.post('/auth/signup', values)
			.then(function (response) {
				message.success('Signup successful');
				console.log(response);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const validateMessage = {
		required: '${label} is required!',
		types: {
			email: '${label} is not a valid email!',
			number: '${label} is not a valid number!',
		},
	};
	return (
		<main className='p-10 flex items-center justify-center'>
			{/* <VerifyAccountModal
				isVisible={isVerificationModalVisible}
				setIsVisible={setIsVerificationModalVisible}
				email={userEmail}
			/> */}

			<section className='flex w-full justify-around items-center shadow-2xl p-10 rounded-lg max-w-screen-2xl min-h-[80vh]'>
				<div className='w-1/3 h-auto hidden md:block'>
					<img
						src='/images/auth/signup.svg'
						alt='illustration'
						className='h-full w-full'
					/>
				</div>

				<div className='w-full md:w-1/2'>
					<Form
						validateMessages={validateMessage}
						layout='vertical'
						form={form}
						onFinish={submitHandler}
						// onChange={() => validateFields(form, setIsRequiredFieldMissing)}
					>
						<Form.Item label='Name' name='name' rules={[{ required: true }]}>
							<Input placeholder='select me' size='large' />
						</Form.Item>

						<Form.Item
							label='Email'
							name='email'
							rules={[{ required: true, type: 'email' }]}
						>
							<Input placeholder='terraformers@select-me.com' size='large' />
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

						<Button
							type='primary'
							size='large'
							htmlType='submit'
							// disabled={isRequiredFieldMissing}
							loading={loading}
						>
							{loading ? 'terraformers ready to assemble...' : 'Signup'}
						</Button>
					</Form>
				</div>
			</section>
		</main>
	);
};

export default Signup;
