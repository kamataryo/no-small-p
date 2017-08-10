import Twitter from 'twitter'
import runBot from './run-bot'
import fs from 'fs'

const env = {
  consumer_key        : process.env.TWITTER_CONSUMER_KEY,
  consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
  access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

// eslint-disable-next-line  no-console
process.on('unhandledRejection', console.dir)

fs.readFile(__dirname + '/../.config.json', (error, body) => {
  const file = JSON.parse(body.toString())
  const config = error ? env : { ...env, ...file }
  const client = new Twitter(config)
  runBot(client, '"#Wordpress"')
  runBot(client, 'Wordpress')
})
