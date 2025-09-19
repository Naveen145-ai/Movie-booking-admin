export default function ListBookings(){
  const rows = new Array(6).fill(0).map((_,i)=>({
    id: 1000 + i,
    user: `user${i+1}@mail.com`,
    title: `Movie ${i+1}`,
    seats: 2 + (i%3),
    price: 20 + i
  }))

  return (
    <div>
      <h1>List <span style={{color:'var(--accent)'}}>Bookings</span></h1>
      <div className="stat-card" style={{marginTop:16,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'separate',borderSpacing:0}}>
          <thead>
            <tr>
              {['Booking ID','User','Title','Seats','Price'].map(h=> (
                <th key={h} style={{textAlign:'left',padding:'12px 10px',color:'var(--muted)',fontWeight:600,borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=> (
              <tr key={r.id} style={{borderBottom:'1px solid var(--border)'}}>
                <td style={{padding:'12px 10px'}}>#{r.id}</td>
                <td style={{padding:'12px 10px'}}>{r.user}</td>
                <td style={{padding:'12px 10px'}}>{r.title}</td>
                <td style={{padding:'12px 10px'}}>{r.seats}</td>
                <td style={{padding:'12px 10px'}}>${r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
