import React, { useState, useEffect, Fragment } from 'react'
// import { ipcRenderer } from 'electron'
import Status from './Status'

export default function Timeline() {

  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    window.electron.onUpdateTimeline('home', (event, status) => {
      setStatuses(statuses => [status, ...statuses].sort((a, b) => ((a.index < b.index) ? 1 : -1)));
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
