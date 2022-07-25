/* eslint-disable */

const validate = async (decoded, request) => {
  try {
    return {
      isValid: true
    }
  } catch (error) {
    return {
      isValid: false
    }
  }
}

module.exports = {
  validate
}
