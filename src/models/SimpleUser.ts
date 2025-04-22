class SimpleUser {
  id: number
  name?: string | null
  email?: string | null
  login: string
  avatar_url: string
  html_url: string
  url: string
  repos_url: string
  type: string

  constructor(user: SimpleUser) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.login = user.login
    this.avatar_url = user.avatar_url
    this.html_url = user.html_url
    this.url = user.url
    this.repos_url = user.repos_url
    this.type = user.type
  }
}

export default SimpleUser
