import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const nav = [
    { to: '/', label: 'Dashboard', icon: '🏠' },
    { to: '/add-show', label: 'Add Shows', icon: '➕' },
    { to: '/list-shows', label: 'List Shows', icon: '🎬' },
    { to: '/list-bookings', label: 'List Bookings', icon: '📒' },
  ]

  return (
    <aside className="sidebar">
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
        <div style={{width:42,height:42,borderRadius:12,background:'#2b2b34',display:'grid',placeItems:'center',fontWeight:700}}>QS</div>
        <div>
          <div className="brand">QuickShow</div>
          <div className="muted" style={{fontSize:12}}>Admin User</div>
        </div>
      </div>
      <div className="nav-section">
        {nav.map(n => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({isActive}) => `nav-item${isActive ? ' active': ''}`}
          >
            <span style={{fontSize:18}}>{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

