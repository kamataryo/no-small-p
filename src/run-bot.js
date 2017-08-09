
export default async client => {

  let tweets

  try {
    tweets = await client.get('search/tweets', { q : '"Wordpress"', count : 100 })
  } catch (e) {
    process.error.write(e)
  }
  const matters = tweets.statuses
    .filter(status => (
      status.text.includes('Wordpress') &&
      !status.text.includes('WordPress')
    ))
    .map(status => ({
      id        : status.id_str,
      favorited : status.favorited,
      retweeted : status.retweeted,
      userId    : status.user.id_str,
      following : status.user.following,
      requested : status.user.follow_request_sent,
    }))

  const retweets = matters
    .filter(x => !x.retweeted)
    .map(matter => client.post('statuses/retweet', { id: matter.id }))

  const followRequests = matters
    .filter(x => !x.following && !x.follow_request_sent)
    .map(matter => client.post('friendships/create', { id: matter.userId }))

  const requests = [...retweets, ...followRequests]

  let result

  if (requests.length > 0) {
    try {
      result = await Promise.all(requests)
    } catch (e) {
      process.stdout.write(result)
      process.stderr.write(e)
    }
  }

  return result

}
