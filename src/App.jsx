import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import './app.less';
import Home from './pages/Home';
import Login from './pages/Login';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Home />
			{/* <Signup /> */}
			{/* <Login /> */}
		</Provider>
	);
}

export default App;
