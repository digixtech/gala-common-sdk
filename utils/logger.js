import moment from 'moment'
import { createLogger, transports, format } from 'winston'
import { includes } from '../constant/remove-field-list'

import { blue, magenta, yellow, america, green, red } from 'colors'
import { inspect } from 'util'

const logFormatDefault = format.combine(format.colorize(), format.timestamp(), format.printf((info) => `[${info.level}]${blue(moment().format('YYYY-MM-DD HH:mm:ss'))}: ${info.message}`))
const logFormatNoDate = format.combine(format.colorize(), format.timestamp(), format.printf((info) => `${info.message}`))

const logger = createLogger({
  transports: [
    new transports.Console({
      format: logFormatDefault
    })
  ]
})

const loggerNoDate = createLogger({
  transports: [
    new transports.Console({
      format: logFormatNoDate
    })
  ]
})

const info = (message) => {
  logger.info(message)
}

const error = (error) => {
  logger.error(inspect(error, true, 2, true))
}
const network = (message) => {
  logger.info(magenta(message))
}

const debug = (message) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(yellow(message))
  }
}

const wtf = (message) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(america(message))
  }
}
/**
 *
 * @param {*} request
 * @param {*} options `{ showRequest: true } to show request log
 * { showResponse: true } to show response log
 */
const hapiApi = (request, options = { showResponse: false, showRequest: true }) => {
  const { showResponse = false, showRequest = true } = options
  const { responded, received, id } = request.info
  const { statusCode = '' } = request.response || {}

  const msToDate = (timestamp) => {
    return blue(moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'))
  }

  const coloredStatusCode = statusCode.toString().charAt(0) == '2' ? green(statusCode) : red(statusCode)
  let message = ''
  message += `[${msToDate(received)}]`
  message += ' '
  message += `${magenta(id)}`
  message += ' '
  message += yellow(request.method.toUpperCase())
  message += ' <-- '
  message += request.url.path
  message += '\n'
  if (showRequest) {
    let payload
    if (request.payload) {
      payload = {}
      Object.keys(request.payload).forEach(key => {
        if (includes(key)) {
          payload[key] = '(field detected. removed...)'
        } else {
          payload[key] = request.payload[key]
        }
      })
    }
    message += 'Payload:\n'
    message += payload ? JSON.stringify(payload, null, 2) : '{No Payload}'
    message += '\n'
  }

  if (showResponse) {
    message += 'Response:\n'
    if (request.response && request.response._payload) {
      if (!request.url.path.includes('get-region')) {
        message += JSON.stringify(JSON.parse(request.response._payload._data), null, 2)
      } else {
        message += '(response detected. removed...)'
      }
    } else {
      message += '{No Payload}'
    }
  }

  if (request && request.response && request.response._error) {
    message += 'Error:\n'
    message += `${red(request.response._error.stack)}\n`
  }
  message += '\n'
  message += `[${msToDate(responded)}]`
  message += ' '
  message += `${magenta(id)}`
  message += ' '
  message += coloredStatusCode
  message += ' --> '
  message += request.url.path
  message += ' '
  message += `(${responded - received}ms)`

  loggerNoDate.info(message)
}

export default {
  info,
  error,
  network,
  debug,
  wtf,
  hapiApi
}
