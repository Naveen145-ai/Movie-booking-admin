import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShowCard from '../components/ShowCard'
import api from '../services/api'

const fallback = new Array(8).fill(0).map((_,i)=>({
  poster: `https://picsum.photos/seed/show${i}/500/300`,
  title: `Show ${i+1}`,
  price: 20 + i,
  rating: (6 + (i%4)) + 0.5,
  date: 'Wed, July 2 at 7:30 PM'
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
      <div className="cards-grid" style={{marginTop:16}}>
        {source.map((s,i)=> (
          <ShowCard key={i} poster={s.poster||s.image||s.posterUrl} title={s.title||s.name} price={s.price||s.ticketPrice||0} rating={s.rating||s.avgRating||'—'} date={s.date||s.datetime||''} />
        ))}
      </div>
    </div>
  )
}
