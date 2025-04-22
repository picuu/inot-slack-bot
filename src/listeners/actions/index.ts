import type { App } from '@slack/bolt'
import sampleActionCallback from './sample-action'
import listReposNextPage from './list-repos_next-page'

const register = (app: App) => {
  app.action('sample_action_id', sampleActionCallback)
  app.action('list-repos_next-page', listReposNextPage)
}

export default { register }
