import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const fallback = new Array(12).fill(0).map((_,i)=>({
  title: ['The Accountant*','A Minecraft Movie','Ballerina','How to Train Your Dragon','K.O.','Mission: Impossible - The Final Reckoning'][i % 6],
  time: ['Tue, June 1 at 7:30 PM','Tue, June 1 at 8:15 PM','Wed, June 2 at 10:30 AM','Mon, November 1 at 2:30 PM','Mon, November 1 at 5:30 PM','Mon, November 1 at 8:30 PM'][i % 6],
  bookings: [0,0,2,0,1,0][i % 6],
  earnings: [0,0,58,0,46,0][i % 6],
}))

export default function ListShows(){
  const [items, setItems] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    let ignore = false
    api.listShows()
      .then(data => { if(!ignore) setItems(Array.isArray(data)? data : fallback) })
      .catch(e => { if(!ignore) setError(e.message||'Failed to load shows') })
      .finally(()=> { if(!ignore) setLoading(false) })
    return ()=> { ignore = true }
  },[])

  const source = loading ? fallback : items

  return (
    <div>
      <div className="header">
        <h1>List <span style={{color:'var(--accent)'}}>Shows</span></h1>
        <button onClick={()=> navigate('/add-show')}>+ Add Show</button>
      </div>
      {error && <div className="muted" style={{color:'salmon',marginTop:8}}>Error: {error}</div>}

      <div className="stat-card" style={{marginTop:16,overflow:'auto'}}>
        <table className="table">
          <thead>
            <tr>
              {['Movie Name','Show Time','Total Bookings','Earnings'].map(h=> (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {source.map((s,i)=> (
              <tr key={i}>
                <td>{s.title || s.name}</td>
                <td>{s.time || s.datetime || s.date || ''}</td>
                <td>{s.bookings ?? s.totalBookings ?? 0}</td>
                <td>${s.earnings ?? s.totalEarnings ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

