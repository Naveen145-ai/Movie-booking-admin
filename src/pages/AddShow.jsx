import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function AddShow() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', poster: '', price: '', rating: '', datetime: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nowPlaying = new Array(9).fill(0).map((_, i) => ({
    poster: `https://picsum.photos/seed/np${i}/400/600`,
    title: ['Predator: Killer of K...','The Accountant*','Lilo & Stitch','Sinners','K.O.','Shadow Force','A Minecraft Movie'][i % 7],
    rating: (6.0 + (i % 4)).toFixed(1),
    votes: [286, 556, 138, 47, 69, 80, 171][i % 7],
    date: ['2025-06-05','2025-04-25','2025-05-17','2025-04-16','2025-06-09','2025-05-01','2025-03-31'][i % 7],
  }))

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.createShow({
        title: form.title,
        poster: form.poster,
        price: Number(form.price),
        rating: Number(form.rating),
        datetime: form.datetime,
      })
      navigate('/list-shows')
    } catch (err) {
      setError(err.message || 'Failed to save show')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Add <span style={{color:'var(--accent)'}}>Shows</span></h1>

      {/* Now Playing carousel */}
      <div className="section-title">Now Playing Movies</div>
      <div style={{display:'flex',gap:14,overflowX:'auto',paddingBottom:6}}>
        {nowPlaying.map((m,i)=> (
          <div key={i} style={{minWidth:180,background:'linear-gradient(180deg, var(--panel), var(--panel-2))',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden'}}>
            <img src={m.poster} alt={m.title} style={{width:180,height:240,objectFit:'cover',display:'block'}} />
            <div style={{padding:'10px 12px'}}>
              <div style={{fontWeight:700,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.title}</div>
              <div className="muted" style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                <span>⭐ {m.rating}</span>
                <span>{m.votes} Votes</span>
              </div>
              <div className="muted" style={{marginTop:6,fontSize:12}}>{m.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form area */}
      <div className="stat-card" style={{maxWidth:760,marginTop:16}}>
        <form className="form" style={{display:'grid',gap:12}} onSubmit={onSubmit}>
          {error && <div className="muted" style={{color:'salmon'}}>Error: {error}</div>}

          <div style={{display:'grid',gap:6}}>
            <label className="muted">Show Price</label>
            <input className="input" name="price" value={form.price} onChange={onChange} type="number" placeholder="Enter show price" required />
          </div>

          <div style={{display:'grid',gap:6}}>
            <label className="muted">Select Date and Time</label>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <input className="input" style={{flex:1}} name="datetime" value={form.datetime} onChange={onChange} type="datetime-local" placeholder="dd-mm-yyyy --:--" required />
              <button type="button">Add Time</button>
            </div>
          </div>

          {/* Hidden fields to enable API post like original */}
          <div style={{display:'none'}}>
            <input className="input" name="title" value={form.title} onChange={onChange} placeholder="Title" />
            <input className="input" name="poster" value={form.poster} onChange={onChange} placeholder="Poster" />
            <input className="input" name="rating" value={form.rating} onChange={onChange} placeholder="Rating" />
          </div>

          <div style={{display:'flex',gap:10,marginTop:6}}>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Show'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

