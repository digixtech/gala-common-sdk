const randomString = require('randomstring')
const _ = require('underscore')

const genRandomString = function (length = 5) {
  return randomString.generate ({
    length,
    charset: 'alphabetic'
  })
}

const genRandomNumber = function (length = 5) {
  return randomString.generate ({
    length,
    charset: 'numeric'
  })
}


const randomAll = (stringLength = 2, numberLength = 3) => {
  const string = genRandomString(stringLength)
  const number = genRandomNumber(numberLength)
  const tempContent = string + number
  const content = tempContent.split('')
  _.shuffle(content)
  return _.shuffle(content).toString().replace(/,/gi, '')
}


module.exports =  {
  randomAll
}