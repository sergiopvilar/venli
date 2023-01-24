// Remember to set type: module in package.json or use .mjs extension
import { join } from 'node:path'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { app } from 'electron';

export default class Config {
  constructor() {
    const file = join(app.getPath('userData'), 'db.json')

    // Configure lowdb to write to JSONFile
    const adapter = new JSONFileSync(file)
    this.db = new LowSync(adapter)
    this.writeDefaults()
  }

  data() {
    this.db.read()
    return this.db.data
  }

  save(instance, token) {
    this.db.data = {
      instance_url: instance,
      access_token: token
    }

    this.db.write()
  }

  writeDefaults() {
    // Read data from JSON file, this will set db.data content
    this.db.read()

    // If db.json doesn't exist, db.data will be null
    // Use the code below to set default data
    // db.data = db.data || { posts: [] } // For Node < v15.x
    this.db.data ||= {
      instance_url: '',
      access_token: ''
    }

    // Finally write db.data content to file
    this.db.write()
  }

}
