import { app } from 'electron';
import fs from 'fs'
import { join } from 'node:path'
import get from 'async-get-file'

export default class ImageBridge {

  constructor() {
    this.directory = join(app.getPath('userData'), 'tmp')
  }

  readFileContents(file, extension) {
    return `data:image/${extension};base64,${fs.readFileSync(file, { encoding: 'base64' })}`
  }

  async cache(url, file, extension) {
    const filename = `${file}.${extension}`

    var options = {
      directory: this.directory,
      filename: filename
    }
    await get(url, options);

    return this.readFileContents(join(this.directory, filename), extension)
  }

}
