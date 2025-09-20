export default function ListBookings(){
  const rows = [
    { user: 'Great Stack', title: 'K.O.', time: 'Mon, November 10 at 5:30 PM', seats: 'A1, A2', amount: 46 },
    { user: 'Great Stack', title: 'The Accountant*', time: 'Tue, June 1 at 8:15 PM', seats: 'C1, C2', amount: 38 },
    { user: 'Great Stack', title: 'A Minecraft Movie', time: 'Tue, June 1 at 1:38 AM', seats: 'G1, G2, G3, G4', amount: 190 },
    { user: 'Great Stack', title: 'A Minecraft Movie', time: 'Tue, June 1 at 3:58 AM', seats: 'E1, E2', amount: 95 },
    { user: 'Great Stack', title: 'Sinners', time: 'Sun, June 7 at 8:51 PM', seats: 'C5, C6, C7', amount: 88 },
  ]

  return (
    <div>
      <h1>List <span style={{color:'var(--accent)'}}>Bookings</span></h1>
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
            {rows.map((r,i)=> (
              <tr key={i}>
                <td>{r.user}</td>
                <td>{r.title}</td>
                <td>{r.time}</td>
                <td>{r.seats}</td>
                <td>${r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

