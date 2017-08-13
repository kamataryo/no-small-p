import log4js from 'log4js'

log4js.configure({
  appenders  : {
    bot   : {
      type     : 'file',
      filename : './logs/error.log',
    },
  },
  categories : {
    default  : {
      appenders: ['bot'],
      level: 'info',
    },
  }
})

export default log4js.getLogger('bot')
