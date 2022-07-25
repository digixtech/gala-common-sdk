import { generate } from 'randomstring'
import { shuffle } from 'underscore'

const genRandomString = function (length = 5) {
  return generate({
    length,
    charset: 'alphabetic'
  })
}

const genRandomNumber = function (length = 5) {
  return generate({
    length,
    charset: 'numeric'
  })
}


const randomAll = (stringLength = 2, numberLength = 3) => {
  const string = genRandomString(stringLength)
  const number = genRandomNumber(numberLength)
  const tempContent = string + number
  const content = tempContent.split('')
  shuffle(content)
  return shuffle(content).toString().replace(/,/gi, '')
}


export default {
  randomAll
}