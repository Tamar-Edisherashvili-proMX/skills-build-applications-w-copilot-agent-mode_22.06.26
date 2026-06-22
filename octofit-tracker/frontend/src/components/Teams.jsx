import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const endpointPath = '/api/teams/'
  const endpoint = `${apiBaseUrl}${endpointPath.replace('/api', '')}`

  useEffect(() => {
    let active = true

    fetchCollection('teams')
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
  }, [])

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
            <div className="metric-pair">
              <span>{team.mascot}</span>
              <strong>{team.memberCount} members</strong>
            </div>
            <p className="quiet">Weekly goal: {team.weeklyGoalMinutes} minutes</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams