import './lib/polyfill-promisify'
import Twitter from 'twitter'
import util from 'util'
import fs from 'fs'
import logger from './logger'
import objectUnique from './lib/object-unique'

import search from './lib/search'
import retweet from './lib/retweet'
import follow  from './lib/follow'
import { update, load } from './lib/db'

/**
 * TASK definition
 * @type {Object}
 */
const TASKS = {
  SEARCH  : 'search',
  RETWEET : 'retweet',
  FOLLOW  : 'follow',
  // REPORT  : 'report',
}

// get given task
const TASK = process.env.NO_SMALL_P_TASK

// determine task
const task = Object.values(TASKS).includes(TASK) ? TASK : TASKS.SEARCH

const env = {
  consumer_key        : process.env.TWITTER_CONSUMER_KEY,
  consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
  access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET,
}
const CONFIG_FILE = __dirname + '/../.config.json'
const DB_CONFIG = {}

const logAndExit = error => {
  logger.error(JSON.stringify(error))
  process.stderr.write(JSON.stringify(error))
  process.exit(1)
}

util.promisify(fs.readFile)(CONFIG_FILE)
  .then(body => {
    const config = JSON.parse(body)
    return { ...env, ...config }
  })
  .catch(error => {
    logger.info(JSON.stringify(error))
    return env
  })
  .then(config => {
    const client = new Twitter(config)

    switch (task) {
      case TASKS.SEARCH:

        return Promise.all([
          search(client, '#Wordpress'),
          search(client, '"Wordpress"'),
        ])
          // process
          .then(results => objectUnique(...results))
          .then(update)
          .catch(logAndExit)

      case TASKS.RETWEET:
        return load({ filter: x => !x.retweeted })
          // .then(retweet(client))
          // .then(update)
          .catch(logAndExit)

      case TASKS.FOLLOW:
        return load({ filter: x => !x.following })
          .then(follow(client))
          .then(update)
    }
  })
  .catch(logAndExit)
