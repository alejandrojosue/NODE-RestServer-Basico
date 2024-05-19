const jwt = require('jsonwebtoken')
const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.PUBLIC_SECRET_KEY, {
      expiresIn: '1h'
    },
    (err, token) => {
      if (err) {
        console.log(err)
        // eslint-disable-next-line
        reject('JWT not generate!')
      } else resolve(token)
    })
  })
}

module.exports = generateJWT
