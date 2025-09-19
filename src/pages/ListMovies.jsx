import { useEffect, useState } from 'react'
import ShowCard from '../components/ShowCard'
import api from '../services/api'

const fallback = new Array(8).fill(0).map((_,i)=>({
  poster: `https://picsum.photos/seed/movie${i}/500/300`,
  title: `Movie ${i+1}`,
  price: 25 + i,
  rating: (7 + (i%3)) + 0.1,
  date: 'Fri, July 4 at 9:30 PM'
}))

export default function ListMovies(){
  const [items, setItems] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    let ignore = false
    api.listMovies()
      .then(data => { if(!ignore) setItems(Array.isArray(data)? data : fallback) })
      .catch(e => { if(!ignore) setError(e.message||'Failed to load movies') })
      .finally(()=> { if(!ignore) setLoading(false) })
    return ()=> { ignore = true }
  },[])

  const source = loading ? fallback : items

  return (
    <div>
      <div className="header">
        <h1>List <span style={{color:'var(--accent)'}}>Movies</span></h1>
      </div>
      {error && <div className="muted" style={{color:'salmon',marginTop:8}}>Error: {error}</div>}
      <div className="cards-grid" style={{marginTop:16}}>
        {source.map((s,i)=> (
          <ShowCard key={i} poster={s.poster||s.image||s.posterUrl} title={s.title||s.name} price={s.price||s.ticketPrice||0} rating={s.rating||s.avgRating||'—'} date={s.date||s.releaseDate||''} />
        ))}
      </div>
    </div>
  )
}
