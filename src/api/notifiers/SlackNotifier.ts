import type Notifier from './Notifier'

class SlackNotifier implements Notifier {
  public async send(message: string): Promise<void> {
    const data = JSON.stringify({
      text: message
    })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    }

    await fetch(process.env.SLACK_PR_WEBHOOK_URL || '', options)
  }
}

export default SlackNotifier
