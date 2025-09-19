import { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import ShowCard from '../components/ShowCard'
import api from '../services/api'

const demoShows = [
  { poster: 'https://image.tmdb.org/t/p/w500/2umU3r6V4Vq36R1vhDV0z7BfgMg.jpg', title: 'Sinners', price: 22, rating: 7.5, date: 'Sun, June 7 at 8:57 PM' },
  { poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', title: 'A Minecraft Movie', price: 19, rating: 6.5, date: 'Tue, June 10 at 1:35 AM' },
  { poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', title: 'A Minecraft Movie', price: 29, rating: 6.5, date: 'Tue, June 10 at 10:31 PM' },
  { poster: 'https://image.tmdb.org/t/p/w500/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg', title: 'A Minecraft Movie', price: 39, rating: 6.5, date: 'Tue, June 10 at 10:31 PM' }
]

export default function Dashboard() {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, activeShows: 0, users: 0 })
  const [shows, setShows] = useState(demoShows)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const [s, sh] = await Promise.all([
          api.stats().catch(()=> ({ bookings: 4, revenue: 2140, activeShows: 43, users: 1 })),
          api.listShows().catch(()=> demoShows),
        ])
        if (!ignore) {
          setStats(s)
          setShows(Array.isArray(sh) ? sh : demoShows)
        }
      } catch (e) {
        if (!ignore) setError(e.message || 'Failed to load dashboard')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  return (
    <div>
      <div className="header">
        <h1>Admin <span style={{color:'var(--accent)'}}>Dashboard</span></h1>
      </div>
      <div className="stat-grid">
        <StatCard title="Total Bookings" value={stats.bookings} icon="🎟️" />
        <StatCard title="Total Revenue" value={`$${stats.revenue}`} icon="💵" />
        <StatCard title="Active Shows" value={stats.activeShows} icon="🎭" />
        <StatCard title="Total Users" value={stats.users} icon="👥" />
      </div>

      <h2 className="section-title">Active Shows</h2>
      {error && <div className="muted" style={{color:'salmon'}}>Error: {error}</div>}
      <div className="cards-grid">
        {(loading ? demoShows : shows).slice(0,4).map((s, i) => (
          <ShowCard key={i} poster={s.poster||s.image||s.posterUrl} title={s.title||s.name} price={s.price||s.ticketPrice||0} rating={s.rating||s.avgRating||'—'} date={s.date||s.datetime||''} />
        ))}
      </div>
    </div>
  )
}
