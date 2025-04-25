import type { App } from '@slack/bolt'
import listRepos from './list-repos'
import sampleCommandCallback from './sample-command'

const register = (app: App) => {
  app.command('/sample-command', sampleCommandCallback)
  app.command('/list-repos', listRepos)
}

export default { register }
