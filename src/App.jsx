import './App.css'

import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import AddShow from './pages/AddShow'
import ListShows from './pages/ListShows'
import ListMovies from './pages/ListMovies'
import ListBookings from './pages/ListBookings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-show" element={<AddShow />} />
        <Route path="list-shows" element={<ListShows />} />
        <Route path="list-movies" element={<ListMovies />} />
        <Route path="list-bookings" element={<ListBookings />} />
      </Route>
    </Routes>
  )
}

export default App
