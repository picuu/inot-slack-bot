import express from 'express'
import type { Express, Request, Response } from 'express'

class WebhookServer {
  private app: Express
  private port: number
  private path: string

  constructor(port: number, path: string) {
    this.app = express()
    this.port = port
    this.path = path

    this.app.use(express.json())

    this.app.post(this.path, this.respond)
  }

  private respond(req: Request, _: Response) {
    const eventType = req.header('X-GitHub-Event')

    // biome-ignore lint/suspicious/noConsole: This is a server log
    console.log(`[Webhook Server] - ${eventType}: ${req.body.action}`)
  }

  run() {
    this.app.listen(this.port, () => {
      // biome-ignore lint/suspicious/noConsole: This is a server log
      console.log(`Server is running on http://localhost:${this.port}`)
    })
  }
}

export default WebhookServer
