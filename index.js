import { generate } from 'randomstring'

const genRandomString = function (length = 5) {
    return generate({
        length,
        charset: 'alphabetic'
    })
}

export default {
    genRandomString
}