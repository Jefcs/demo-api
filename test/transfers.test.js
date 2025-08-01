const request = require('supertest')
const { expect } = require('chai')
const { getToken } = require('../helpers/authentication')

require('dotenv').config()

describe('Transfers', () => {
  describe('POST /transferencias', () => {
    let token
    beforeEach(async () => {
      token = await getToken('julio.lima', '123456')
    })

    it('must return 201 when the amount transferred is equal or greater than R$10,00', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ contaOrigem: 1, contaDestino: 2, valor: 150, token: '' })

      expect(response.status).to.equal(201)
    })

    it('must return 422 when the amount transferred is less than R$10,00', async () => {
      const response = await request('http://localhost:3000')
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ contaOrigem: 1, contaDestino: 2, valor: 8, token: '' })

      expect(response.status).to.equal(422)
    })
  })
})
