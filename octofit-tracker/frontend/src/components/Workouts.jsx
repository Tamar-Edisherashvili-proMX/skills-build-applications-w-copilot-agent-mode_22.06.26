import { useEffect, useState } from 'react'
import { fetchCollectionFromUrl } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    let active = true

    fetchCollectionFromUrl(endpoint, 'workouts')
      .then((data) => {
        if (active) {
          setWorkouts(data)
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
          <p className="eyebrow">Recommendations</p>
          <h1>Workouts</h1>
        </div>
        <code>{endpoint}</code>
      </div>
      {error && <div className="alert alert-warning">Unable to load workouts: {error}</div>}
      <div className="resource-grid">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id || workout.title}>
            <h2>{workout.title}</h2>
            <div className="meta-row">
              <span>{workout.focusArea}</span>
              <span>{workout.difficulty}</span>
            </div>
            <p>{workout.durationMinutes} minutes</p>
            <ul>
              {(workout.exercises || []).map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts