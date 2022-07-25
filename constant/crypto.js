const config = require('config')

const Crypto = {
    KEY: config.get('KEY'),
    DS_KEY: config.get('DS_KEY')
}

module.exports =  Crypto