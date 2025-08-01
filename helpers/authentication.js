const request = require('supertest')

const getToken = async (username, password) => {
  const response = await request(process.env.BASE_URL)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({ username, senha: password })

  return response.body.token
}

module.exports = { getToken }
