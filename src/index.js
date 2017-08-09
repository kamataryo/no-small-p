import Twitter from 'twitter'
import runBot from './run-bot'
import fs from 'fs'

const env = {
  consumer_key        : process.env.TWITTER_CONSUMER_KEY,
  consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
  access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

let config

fs.readFile(__dirname + '/../.config.json', (error, body) => {
  if (!error) {
    config = JSON.parse(body.toString())
  }
  const client = new Twitter({ ...env, ...config })

  runBot(client)
})
