import { login } from 'masto'
import Config from '../db/config'

export default class Timeline {
  constructor(window) {
    console.log("Timeline started")
    this.window = window
    this.data = new Config().data()
    this.startup()
  }

  async startup() {
    console.log(`https://${this.data.instance_url}`)
    const masto = await login({
      url: `https://${this.data.instance_url}`,
      accessToken: this.data.access_token.access_token,
      disableVersionCheck: true
    })

    const stream = await masto.v1.stream.streamPublicTimeline();

    // Subscribe to updates
    stream.on('update', (status) => {
      this.window.webContents.send('timeline-update', status)
    });

  }
}
