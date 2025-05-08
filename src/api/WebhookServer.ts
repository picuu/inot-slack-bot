import express from 'express'
import type { Express, Request, Response } from 'express'
import type { Notifier } from './notifiers'

class WebhookServer {
  private app: Express
  private host: string
  private port: number
  private path: string
  private notifier: Notifier

  constructor(host: string, port: number, path: string, notifier: Notifier) {
    this.app = express()
    this.host = host
    this.port = port
    this.path = path
    this.notifier = notifier

    this.app.use(express.json())

    this.app.post(this.path, this.handleWebhook.bind(this))
  }

  private handleWebhook(req: Request, res: Response) {
    const eventType = req.header('X-GitHub-Event')
    const payload = req.body

    // biome-ignore lint/suspicious/noConsole: This is a server log
    console.log(`[Webhook Server] - ${eventType}: ${payload.action}`)

    switch (eventType) {
      case 'pull_request':
        this.notifier.send(`New ${eventType} event: ${payload.action}`)
        break
    }

    res.status(200).send()
  }

  run() {
    this.app.listen(this.port, this.host, () => {
      // biome-ignore lint/suspicious/noConsole: This is a server log
      console.log(`Server is running on http://${this.host}:${this.port}`)
    })
  }
}

export default WebhookServer
