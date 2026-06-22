import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const endpoint = getApiUrl('leaderboard')

  useEffect(() => {
    let active = true

    fetchCollection('leaderboard')
      .then((data) => {
        if (active) {
          setLeaderboard(data)
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
          <p className="eyebrow">Competition</p>
          <h1>Leaderboard</h1>
        </div>
        <code>{endpoint}</code>
      </div>
      {error && <div className="alert alert-warning">Unable to load leaderboard: {error}</div>}
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="leaderboard-row" key={entry._id || entry.userEmail}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.userName}</h2>
              <p>{entry.teamName}</p>
            </div>
            <strong>{entry.points} pts</strong>
            <span>{entry.totalMinutes} min</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard