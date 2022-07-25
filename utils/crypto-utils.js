const crypto = require('crypto')
const _crypto = require('../constant/crypto').default
const key = _crypto.KEY
const ds4Key = _crypto.DS_KEY
const algorithm = 'aes-256-ecb'
const ds4Algorithm = 'aes-128-ecb'
const Logger = require('../utils/logger')
const prefix = 'kyc'

function padString(str) {
  const range = 32
  const length = (str.length % range)
  const i = (range - length)
  if ((i > 0) && (i < range)) {
    for (let j = (range - length); j > 0; j--) {
      str += ' '
    }
  }
  return str
}
function ds4PadString(str) {
  const range = 16
  const length = (str.length % range)
  const i = (range - length)
  if ((i > 0) && (i < range)) {
    for (let j = (range - length); j > 0; j--) {
      str += ' '
    }
  }
  return str
}


const encrypt = function (value) {
  const cipher = crypto.createCipheriv(algorithm, padString(key), '')
  let crypted = cipher.update(prefix + value, 'utf-8', 'base64')
  crypted += cipher.final('base64')
  return crypted
}


const decrypt = function (value) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, padString(key), '')
    let decrypted = decipher.update(value, 'base64', 'utf-8')
    decrypted += decipher.final('utf-8')
    if (decrypted.startsWith(prefix)) {
      return decrypted.substring(3)
    } else {
      return decrypted
    }
  } catch (error) {
    Logger.info(`error while decrypting '${value}' field. This data is not encrypted.`)
    return value
  }
}

const ds4Encrypt = function (data) {
  var cipher = crypto.createCipheriv(ds4Algorithm, ds4PadString(ds4Key), '')
  var crypted = cipher.update(data, 'utf-8', 'base64')
  crypted += cipher.final('base64')
  return crypted
}

const ds4Decrypt = function (crypted) {
  var decipher = crypto.createDecipheriv(ds4Algorithm, ds4PadString(ds4Key), '')
  var decrypted = decipher.update(crypted, 'base64')
  decrypted += decipher.final()
  return decrypted
}

const genSignature = function (secretKey, requestBody, nonce) {
  return crypto.createHmac('sha256', secretKey).update(`${requestBody}${nonce}`).digest('hex')
}

const genSignatureBase64 = function (secretKey, requestBody, nonce) {
  return crypto.createHmac('sha256', secretKey).update(`${requestBody}${nonce}`).digest('base64')
}


module.exports = {
  encrypt,
  decrypt,
  ds4Encrypt,
  ds4Decrypt,
  genSignature,
  genSignatureBase64
}