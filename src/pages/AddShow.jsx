import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function AddShow() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', poster: '', price: '', rating: '', datetime: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      <h1>Add <span style={{color:'var(--accent)'}}>Show</span></h1>
      <div className="stat-card" style={{maxWidth:720,marginTop:16}}>
        <form className="form" style={{display:'grid',gap:12}} onSubmit={onSubmit}>
          {error && <div className="muted" style={{color:'salmon'}}>Error: {error}</div>}
          <div style={{display:'grid',gap:6}}>
            <label className="muted">Title</label>
            <input className="input" name="title" value={form.title} onChange={onChange} placeholder="Show title" required />
          </div>
          <div style={{display:'grid',gap:6}}>
            <label className="muted">Poster URL</label>
            <input className="input" name="poster" value={form.poster} onChange={onChange} placeholder="https://..." required />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            <div style={{display:'grid',gap:6}}>
              <label className="muted">Price ($)</label>
              <input className="input" name="price" value={form.price} onChange={onChange} type="number" required />
            </div>
            <div style={{display:'grid',gap:6}}>
              <label className="muted">Rating</label>
              <input className="input" name="rating" value={form.rating} onChange={onChange} type="number" step="0.1" />
            </div>
            <div style={{display:'grid',gap:6}}>
              <label className="muted">Date & Time</label>
              <input className="input" name="datetime" value={form.datetime} onChange={onChange} type="datetime-local" required />
            </div>
          </div>
          <div style={{display:'flex',gap:10,marginTop:6}}>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="reset" onClick={()=> setForm({ title:'', poster:'', price:'', rating:'', datetime:'' })} style={{background:'transparent'}}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}
