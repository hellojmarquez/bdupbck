import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, Login, Register, Preferences, Swipe } from './Views'
import Conversations from './Components/Conversations/Conversations'
import Chat from './Components/Conversations/Chat/Chat';
import { useEffect, useState } from "react";
import Notification from './Components/PushNotification/Notification';
import Catefories from './Views/Categories'

function App() {
	const [token, setToken] = useState(JSON.parse(sessionStorage.getItem("token")) || "");
	useEffect(() => {
		setToken(token);
	}, [token]);

	return (
		<Routes>
			<Route path='/' element={<Home />} />

			<Route path='/nueva' element={<Home />} />
			<Route path='/login' element={token ? <Swipe /> : <Login />} />

			<Route
				path='/conversations'
				element={token ? <Conversations /> : <Login />}
			/>
				<Route
				path='/chat/:id'
				element={token ? <Chat /> : <Login />}
			/>
			<Route path='/register' element={token ? <Swipe /> : <Register />} />
			<Route path='/preferences' element={token ? <Preferences /> : <Login />} />
			<Route path='/categories' element={token ? <Catefories /> : <Login />} />
			<Route path='/swipe' element={token ? <Swipe /> : <Login />} />
			<Route path='*' element={<Navigate replace={true} to='/' />} />
			<Route path="/notication" element={<Notification />} />
		</Routes>
	)
}

export default App
