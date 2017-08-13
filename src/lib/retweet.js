
/**
 * retweet
 * @param  {TwitterClient} client twitter client instance
 * @param  {array<Matter>} matters Array of matter object
 * @return {Promise}       Promise resolve with request results
 */

export default client => matters => {

  const requests = matters
    .map(matter => {
      return client.post('statuses/retweet', { id: matter.id })
    })

  return Promise.all(requests)
}
