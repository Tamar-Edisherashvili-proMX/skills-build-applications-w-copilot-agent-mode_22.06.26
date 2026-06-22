import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  useEffect(() => {
    let active = true

    fetchCollectionFromUrl(endpoint, 'teams')
      .then((data) => {
        if (active) {
          setTeams(data)
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
          <p className="eyebrow">Squads</p>
          <h1>Teams</h1>
        </div>
        <code>{endpoint}</code>
      </div>
      {error && <div className="alert alert-warning">Unable to load teams: {error}</div>}
      <div className="resource-grid">
        {teams.map((team) => (
          <article className="resource-card" key={team._id || team.name}>
            <h2>{team.name}</h2>
            <p>{team.city}</p>
            {team.description && <p>{team.description}</p>}
            {team.schedule && <p className="quiet">Schedule: {team.schedule}</p>}
            <div className="metric-pair">
              <span>{team.mascot}</span>
              {team.maxAttendance ? (
                <strong>{team.maxAttendance} max attendees</strong>
              ) : (
                <strong>{team.memberCount} members</strong>
              )}
            </div>
            <p className="quiet">Weekly goal: {team.weeklyGoalMinutes} minutes</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams