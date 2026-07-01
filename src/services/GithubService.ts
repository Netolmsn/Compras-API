import axios from 'axios'

type GithubUser = {
  login: string
}

export class GithubService {
  static async getRandomUserLogin(): Promise<string> {
    const url = process.env.GITHUB_USERS_API || 'https://api.github.com/users'

    try {
      const response = await axios.get<GithubUser[]>(url, {
        timeout: 5000,
      })

      const users = response.data

      if (!Array.isArray(users) || users.length === 0) {
        throw new Error('A API do GitHub não retornou usuários.')
      }

      const randomIndex = Math.floor(Math.random() * users.length)

      return users[randomIndex].login
    } catch {
      throw new Error('GITHUB_API_ERROR')
    }
  }
}