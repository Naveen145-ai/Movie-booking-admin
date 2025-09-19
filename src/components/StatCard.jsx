export default function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
        </div>
        <div style={{width:38,height:38,borderRadius:10,display:'grid',placeItems:'center',background:'rgba(255,77,109,0.12)',border:'1px solid rgba(255,77,109,0.25)'}}>
          <span style={{fontSize:18}}>{icon}</span>
        </div>
      </div>
    </div>
  )
}
