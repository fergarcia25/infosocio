import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <Outlet />
      </div>
    </div>
  )
}
