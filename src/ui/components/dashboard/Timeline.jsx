import React, { useState, useEffect } from 'react'
// import { ipcRenderer } from 'electron'
import Store from '../../ObjectStore'

export default function Timeline() {

  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    window.electron.onUpdateTimeline((event, status) => {
      console.log('status chegou')
      setStatuses(statuses => [status, ...statuses]);
    })
  }, [])


  // return (<div>Ola</div>)


  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {statuses.map((status) => (
          <li key={status.id} className="py-4">
            <div className="flex space-x-3">
              <img className="h-6 w-6 rounded-full" src={status.account.avatar} alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{status.account.displayName}</h3>
                  <p className="text-sm text-gray-500">{status.createdAt.time}</p>
                </div>
                <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: status.content }}>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
