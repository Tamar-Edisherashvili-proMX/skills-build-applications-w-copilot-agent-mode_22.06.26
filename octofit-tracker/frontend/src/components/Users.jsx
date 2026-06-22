import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  useEffect(() => {
    let active = true

    fetchCollectionFromUrl(endpoint, 'users')
      .then((data) => {
        if (active) {
          setUsers(data)
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message)
        }
      })

    return () => {
      active = false
    }
  }, [endpoint])

  return (
    <section className="view-panel">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Members</p>
          <h1>Users</h1>
        </div>
        <code>{endpoint}</code>
      </div>
      {error && <div className="alert alert-warning">Unable to load users: {error}</div>}
      <div className="resource-grid">
        {users.map((user) => (
          <article className="resource-card" key={user._id || user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="meta-row">
              <span>{user.role}</span>
              <span>{user.teamName}</span>
            </div>
            <ul>
              {(user.goals || []).map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users