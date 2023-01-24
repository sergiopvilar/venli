import axios from 'axios'
import { shell } from "electron"
import Clients from './db/clients'
import Config from './db/config'

export default class Authenticator {

  constructor(instance) {
    this.clients = new Clients()
    this.config = new Config()
    this.instance = instance
  }

  authenticate() {
    if (this.getApp()) {
      this.app = this.getApp()
      this.getCode()
    }
    else
      this.createApp()
  }

  authenticadeCode(code) {
    this.app = this.getApp()
    this.code = code

    axios.post(`https://${this.instance}/oauth/token`, {
      client_id: this.app.data.client_id,
      client_secret: this.app.data.client_secret,
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
      grant_type: 'authorization_code',
      code: code,
      scope: 'read write push',
    }).then((response) => {
      console.log(response.data)
      this.config.save(this.instance, response.data)
    })
  }

  getCode() {
    const url = `https://${this.instance}/oauth/authorize?client_id=${this.app.data.client_id}&scope=read+write+push&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`
    shell.openExternal(url)
  }

  createApp() {
    axios.post(`https://${this.instance}/api/v1/apps`, {
      client_name: 'Venli',
      redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
      scopes: 'read write push',
      website: 'http://vilar.cc',
    })
      .then((response) => {
        const client = {
          url: this.instance,
          data: response.data
        }

        this.clients.save(client)
        this.app = client
        this.getCode()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getApp() {
    return this.clients.fetch(this.instance)
  }

}
