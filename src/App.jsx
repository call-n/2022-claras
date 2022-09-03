import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/NotFound'
import Players from './pages/Players'
import Teams from './pages/Teams'
import AddPoints from './pages/AddPoints'
import AddChallange from './pages/AddChallange'
import Login from './pages/Login'
import {
	Box,
} from '@chakra-ui/react'

function App() {
	const { authIsReady, user } = useAuthContext()
	
	return (
		<Box id="App" background="rgb(32, 33, 36)" color="rgb(248, 249, 250)" height="100%" minHeight="100vh">
			{authIsReady && (
				<div>
					<Routes>
						<Route exact path="/" element={<HomePage />} />
						<Route path="/teams" element={!user ? <Navigate to="/login" /> : <Teams />} />

						<Route path="/players" element={!user ? <Navigate to="/login" /> : <Players />} />

						<Route path="/addpoints" element={!user ? <Navigate to="/login" /> : <AddPoints />} />

						<Route path="/addchallange" element={!user ? <Navigate to="/login" /> : <AddChallange />} />

						<Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

						<Route path="*" element={<PageNotFound />}/>
					</Routes>
				</div>
			)}
		</Box>
	)
}

export default App