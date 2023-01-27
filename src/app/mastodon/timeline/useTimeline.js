import Config from '../../db/config'

import useLogin from '../useLogin'
import useStream from './useStream'
import useUpdate from './useUpdate'
import useExtraFields from './useExtraFields'

export default async function useTimeline(window, timeline = 'home') {
  const data = new Config().data()
  const masto = await useLogin(data)
  const stream = await useStream(timeline, masto)
  const { firstLoad, onUpdate, limit } = await useUpdate(timeline, masto)
  const items = []

  let index = limit

  const pushBatch = (statuses) => {
    for (var i in statuses) pushStatus(statuses[i])
  }

  const pushStatus = (status) => {
    publishStatus(status, index++)
  }

  const publishStatus = async(status, index) => {
    if (items.indexOf(status.id) > -1) return

    items.push(status.id)
    status = await useExtraFields(status, index)

    window.webContents.send(`timeline-update-${timeline}`, status)
  }

  firstLoad.map((item, itemIndex) => publishStatus(item, limit - itemIndex))
  stream.on('update', (status) => pushStatus(status))
  onUpdate((items) => pushBatch(items))
}