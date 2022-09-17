import { Provider } from 'react-redux';
import Signup from './pages/Signup';
import './app.less';
import Home from './pages/Home';
import Login from './pages/Login';
import store from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
