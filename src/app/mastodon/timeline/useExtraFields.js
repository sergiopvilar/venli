import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import useBridge from './useBridge'
TimeAgo.addDefaultLocale(en)

export default async function useExtraFields(status, index) {
  const timeAgo = new TimeAgo('en-US')
  status.timeAgo = timeAgo.format(Date.parse(status.createdAt))
  status.time = Date.parse(status.createdAt)

  if (status.reblog) {
    status.reblog.timeAgo = timeAgo.format(Date.parse(status.reblog.createdAt))
    status.reblog.time = Date.parse(status.reblog.createdAt)
  }

  const hide = status.filtered.filter((filtered) => {
    return filtered.filter.filterAction == 'hide'
  })

  status.images = await useBridge(status)
  status.index = index
  status.hide = hide.length > 0

  return status
}
