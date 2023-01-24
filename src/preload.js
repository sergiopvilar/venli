// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'
import Store from './ui/ObjectStore'

console.log('preload carregou')
window.statuses = []

contextBridge.exposeInMainWorld(
  'electron',
  {
    authenticateInstance: (instance) => {
      ipcRenderer.send('authenticate-instance', instance)
    },
    authenticateCode: (instance, code) => {
      ipcRenderer.send('authenticate-code', instance, code)
    },
    onUpdateTimeline: (callback) => {
      ipcRenderer.on('timeline-update', callback)
    }
  }
)

ipcRenderer.on('auth-status', (event, auth, data) => {
  Store.setValue('authenticated', auth)
  Store.setValue('data', data)
})
