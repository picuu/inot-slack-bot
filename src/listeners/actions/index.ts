import type { App } from '@slack/bolt'
import sampleActionCallback from './sample-action'
import listReposNextPage from './list-repos_next-page'
import listReposPrevPage from './list-repos_prev-page'

const register = (app: App) => {
  app.action('sample_action_id', sampleActionCallback)
  app.action('list-repos_next-page', listReposNextPage)
  app.action('list-repos_prev-page', listReposPrevPage)
}

export default { register }
