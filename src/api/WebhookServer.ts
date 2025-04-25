import bodyParser from 'body-parser'
import express from 'express'
import type { Express } from 'express'

class WebhookServer {
  private app: Express
  private port: number
  private path: string

  constructor(port: number, path: string) {
    this.app = express()
    this.port = port
    this.path = path
  }

  private respond() {

  }

  run() {
    this.app.use(bodyParser.json())

    this.app.listen(this.port, () => {
      // biome-ignore lint/suspicious/noConsole: This is a server log
      console.log(`Server is running on http://localhost:${this.port}`)
    })
  }
}

export default WebhookServer
