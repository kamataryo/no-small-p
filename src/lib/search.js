
/**
 * search Woedpress Matters
 * @param  {TwitterClient} client twitter client instance
 * @param  {string}        q      querystring
 * @return {Promise}              promise returns matter object
 */

export default (client, q) => client
  .get('search/tweets', { q, count : 100 })
  .then(tweets => tweets.statuses
      .filter(({ text }) => (
        text.includes('Wordpress') && !text.includes('WordPress')
      ))
      .map(status => {
        return ({
          created_at : status.created_at,
          favorited  : status.favorited,
          following  : status.user.following,
          id         : status.id_str,
          lang       : status.user.lang,
          requested  : status.user.follow_request_sent,
          retweeted  : status.retweeted,
          userId     : status.user.id_str,
        })
      })
  )
