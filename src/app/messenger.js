import { ipcMain } from 'electron'
import Authenticator from "./auth";

export default function() {

  console.log('Messenger listening')

  ipcMain.on('authenticate-instance', (event, instance) => {
    new Authenticator(instance).authenticate()
  })

  ipcMain.on('authenticate-code', (event, instance, code) => {
    new Authenticator(instance).authenticadeCode(code)
  })


}
