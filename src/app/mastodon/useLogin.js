import Config from '../db/config'
import { login } from 'masto'

export default async function useLogin() {
  const data = new Config().data()
  const mastodon = await login({
    url: `https://${data.instance_url}`,
    accessToken: data.access_token.access_token,
    disableVersionCheck: true
  })

  return mastodon
}
