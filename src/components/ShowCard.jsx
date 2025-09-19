export default function ShowCard({ poster, title, price, rating, date }) {
  return (
    <div className="show-card">
      <img className="show-thumb" src={poster} alt={title} />
      <div className="show-body">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontWeight:700}}>{title}</div>
            <div className="muted" style={{marginTop:4}}>{date}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontWeight:800}}>${price}</div>
            <div className="muted" style={{marginTop:4}}>⭐ {rating}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
