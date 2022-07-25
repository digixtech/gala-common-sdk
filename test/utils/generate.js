const GenerateUtils = require('../../utils/generate')

const genRandomNumber = () => {
  const result = GenerateUtils.randomAll()
  console.log('[debug]result', result)
}

const activeTest = async () => {
  genRandomNumber()
}
activeTest()