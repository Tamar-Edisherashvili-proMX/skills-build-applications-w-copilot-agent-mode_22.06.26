import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const endpointPath = '/api/activities/'
  const endpoint = `${apiBaseUrl}${endpointPath.replace('/api', '')}`

  useEffect(() => {
    let active = true

    fetchCollection('activities')
      .then((data) => {
        if (active) {
          setActivities(data)
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
          <p className="eyebrow">Training log</p>
          <h1>Activities</h1>
        </div>
        <code>{endpoint}</code>
      </div>
      {error && <div className="alert alert-warning">Unable to load activities: {error}</div>}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Athlete</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || `${activity.userEmail}-${activity.performedAt}`}>
                <td>{activity.type}</td>
                <td>{activity.userEmail}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleDateString() : 'TBD'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities