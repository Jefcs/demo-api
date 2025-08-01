const request = require('supertest')
const { expect } = require('chai')
const { getToken } = require('../helpers/authentication')

require('dotenv').config()

describe('Transfers', () => {
  describe('POST /transferencias', () => {
    it('must return 201 when the amount transferred is equal or greater than R$10,00', async () => {
      const token = await getToken('julio.lima', '123456')

      const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'julio.lima', senha: '123456' })

      const token = responseLogin.body.token


      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ contaOrigem: 1, contaDestino: 2, valor: 150, token: '' })

      expect(response.status).to.equal(201)
    })

    it('must return 422 when the amount transferred is less than R$10,00', async () => {
      const token = await getToken('julio.lima', '123456')

      const response = await request('http://localhost:3000')
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ contaOrigem: 1, contaDestino: 2, valor: 8, token: '' })

      expect(response.status).to.equal(422)
    })
  })
})
