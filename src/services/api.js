const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(()=> '')
    throw new Error(text || `Request failed: ${res.status}`)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const api = {
  // Shows
  listShows: () => request('/api/admin/shows'),
  createShow: (payload) => request('/api/admin/shows', { method: 'POST', body: JSON.stringify(payload) }),
  // Movies
  listMovies: () => request('/api/admin/movies'),
  // Bookings
  listBookings: () => request('/api/bookings/getBook'),
  // Stats
  stats: () => request('/api/admin/stats'),
}

export default api
