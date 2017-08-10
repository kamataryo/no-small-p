
/**
 * [description]
 * @param  {TwitterClient} client twitter client instance
 * @return {Promise}        [description]
 */

export default (client, q) => client
  .get('search/tweets', { q, count : 100 })
  .then(tweets => {
    const matters = tweets.statuses
      .filter(({ text }) => (
        text.includes('Wordpress') &&
        !text.includes('WordPress')
      ))
      .map(status => ({
        id        : status.id_str,
        favorited : status.favorited,
        retweeted : status.retweeted,
        userId    : status.user.id_str,
        following : status.user.following,
        requested : status.user.follow_request_sent,
        lang      : status.user.lang,
      }))

      const retweetRequests = matters
        .filter(x => !x.retweeted)
        .map(matter => client.post('statuses/retweet', { id: matter.id }))

      const followRequests = matters
        .filter(x => !x.following && !x.follow_request_sent)
        .map(matter => client.post('friendships/create', { id: matter.userId }))

      const requests = [...retweetRequests, ...followRequests]

      return requests.length > 0 ? Promise.all(requests) : false
  })
  .then(results => process.stdout.write(JSON.stringify(results)))
  .catch(error => process.stderr.write(JSON.stringify(error)))
