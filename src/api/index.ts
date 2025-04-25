import WebhookServer from './WebhookServer'

process.loadEnvFile()

const port = Number(process.env.API_PORT) || 5000
const path = '/webhook'

const server = new WebhookServer(port, path)
server.run()
