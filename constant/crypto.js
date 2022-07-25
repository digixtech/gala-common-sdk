process.env["KEY"] = 'GALA_KYC'
process.env["DS_KEY"] = 'KYCGALA'

const Crypto = {
    KEY: process.env.KEY,
    DS_KEY: process.env.DS_KEY
}

console.log('config',config)

module.exports =  Crypto