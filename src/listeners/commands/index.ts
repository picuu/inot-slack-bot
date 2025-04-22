import type { App } from '@slack/bolt'
import sampleCommandCallback from './sample-command'
import listRepos from './list-repos'

const register = (app: App) => {
  app.command('/sample-command', sampleCommandCallback)
  app.command('/list-repos', listRepos)
}

export default { register }
