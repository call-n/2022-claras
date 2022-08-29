import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/NotFound'
import Players from './pages/Players'
import Teams from './pages/Teams'
import AddPoints from './pages/AddPoints'
import {
	Box,
} from '@chakra-ui/react'

function App() {
	return (
		<Box id="App" background="rgb(32, 33, 36)" color="rgb(248, 249, 250)" height="100%" minHeight="100vh">
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/players" element={<Players />} />
				<Route path="/teams" element={<Teams />} />
				<Route path="/addpoints" element={<AddPoints />} />

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Box>
	)
}

export default App