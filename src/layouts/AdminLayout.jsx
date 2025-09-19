import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
