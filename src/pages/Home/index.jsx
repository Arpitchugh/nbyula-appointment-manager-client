import React from 'react';
import { Button, Typography } from 'antd';
const { Paragraph, Title } = Typography;
const home = () => {
	return (
		<>
			<section className='w-full items-center shadow-2xl m-10 p-5 rounded-lg max-w-screen-2xl min-h-[80vh]'>
				<Title level={2}>Hi terraformer!!!</Title>
				<Title level={5}>Let's build today's schedule</Title>
				<div className='flex'>
					<Button type='primary' className='mr-4' size='large'>
						Sign up
					</Button>
					<Button type='primary' size='large'>
						Login
					</Button>
				</div>
			</section>
		</>
	);
};

export default home;
