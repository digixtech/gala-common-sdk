import { genRandomNumber as _genRandomNumber } from '../../utils/generate'

const genRandomNumber = () => {
  const result = _genRandomNumber()
  console.log('[debug]result', result)
}

const activeTest = async () => {
  genRandomNumber()
}
activeTest()