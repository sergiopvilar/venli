import React, { useState, useEffect, Fragment } from 'react'
// import { ipcRenderer } from 'electron'
import Status from './Status'

export default function Timeline() {

  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    window.electron.onUpdateTimeline('home', (event, status) => {
      const sortFunction = (a, b) => {
        if (a.time < b.time) return 1
        if (a.time > b.time) return -1

        return (a.index < b.index) ? 1 : -1
      }
      setStatuses(statuses => [status, ...statuses].sort(sortFunction));
    })
  }, [])

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {statuses.map((item, index) => {
          return (
            <Fragment key={index}>
            {!item.hide && <li key={item.id} className="py-4">
              <Status data={item} />
            </li>}
            </Fragment>)
        })}
      </ul>
    </div>
  )
}
