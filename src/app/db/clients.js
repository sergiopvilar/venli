// Remember to set type: module in package.json or use .mjs extension
import { join } from 'node:path'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { app } from 'electron';

export default class Clients {
  constructor() {
    const file = join(app.getPath('userData'), 'clients.json')

    // Configure lowdb to write to JSONFile
    const adapter = new JSONFileSync(file)
    this.db = new LowSync(adapter)
    this.writeDefaults()
  }

  data() {
    this.db.read()
    return this.db.data
  }

  save(client) {
    console.log('saving...')
    console.log(client)
    this.db.data.clients.push(client)
    this.db.write()
  }

  fetch(url) {
    this.db.read()
    const result = this.db.data.clients.filter((item) => {
      return item.url === url
    })[0]
    return result ? result : false
  }

  writeDefaults() {
    // Read data from JSON file, this will set db.data content
    this.db.read()

    // If db.json doesn't exist, db.data will be null
    // Use the code below to set default data
    // db.data = db.data || { posts: [] } // For Node < v15.x
    this.db.data ||= {
      clients: []
    }

    // Finally write db.data content to file
    this.db.write()
  }

}
