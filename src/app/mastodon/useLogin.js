import { login } from 'masto'

export default async function useLogin(data) {

  const mastodon = await login({
    url: `https://${data.instance_url}`,
    accessToken: data.access_token.access_token,
    disableVersionCheck: true
  })

  return mastodon
}
