import { useEffect, useState } from 'react'
import api from '../services/api'

export default function ListBookings(){
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    let ignore=false
    api.listBookings()
      .then(data=> { if(!ignore) setRows(Array.isArray(data)? data:[]) })
      .catch(e=> { if(!ignore) setError(e.message||'Failed to load') })
    return ()=> { ignore = true }
  },[])

  return (
    <div>
      <h1>List <span style={{color:'var(--accent)'}}>Bookings</span></h1>
      {error && <div className="muted" style={{color:'salmon',marginTop:8}}>Error: {error}</div>}
      <div className="stat-card" style={{marginTop:16,overflow:'auto'}}>
        <table className="table">
          <thead>
            <tr>
              {['User Name','Movie Name','Show Time','Seats','Amount'].map(h=> (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=> {
              const seats = Array.isArray(r.seats)? r.seats.join(', '): r.seats
              return (
                <tr key={r._id || i}>
                  <td>{r.userEmail || r.user || '—'}</td>
                  <td>{r.movieTitle || r.title}</td>
                  <td>{r.showTime || r.time}</td>
                  <td>{seats}</td>
                  <td>${r.totalPrice ?? r.amount ?? 0}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

