import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import './app.less';
import Login from './pages/Login';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Signup />
			{/* <Login /> */}
		</Provider>
	);
}

export default App;
