# Open a Modal View

```ts
await client.views.open({
  trigger_id: body.trigger_id,
  view: {
    type: 'modal',
    callback_id: 'modal-identifier',
    title: {
      type: 'plain_text',
      text: 'Repo List'
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${repoCount}* repos found for user *${user}*`
        }
      }
    ]
  }
})
```
