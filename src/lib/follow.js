
/**
 * follow
 * @param  {TwitterClient} client twitter client instance
 * @param  {array<Matter>} matters Array of matter object
 * @return {Promise}        Promise resolve with request results
 */

export default (client, matters) => {

  const promisedFollow = matters
    .filter(x => !x.following && !x.follow_request_sent)
    .map(matter => client.post('friendships/create', { id: matter.userId }))

  return promisedFollow
}
