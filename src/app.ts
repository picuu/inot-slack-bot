import { App, LogLevel } from '@slack/bolt'
import registerListeners from '@/listeners'

process.loadEnvFile()

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.INFO
})

/** Register Listeners */
registerListeners(app)

/** Start Bolt App */
;(async () => {
  try {
    await app.start(process.env.PORT || 3000)
    app.logger.info('⚡️ Bolt app is running! ⚡️')
  } catch (error) {
    app.logger.error('Unable to start App', error)
  }
})()
