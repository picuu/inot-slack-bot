import { SlackNotifier } from './notifiers'
import WebhookServer from './WebhookServer'

process.loadEnvFile()

const notifier = new SlackNotifier()

const host = process.env.API_HOST || 'localhost'
const port = Number(process.env.API_PORT) || 5000
const path = '/webhook'

const server = new WebhookServer(host, port, path, notifier)
server.run()
