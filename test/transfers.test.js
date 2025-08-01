const request = require('supertest')
const { expect } = require('chai')
const { getToken } = require('../helpers/authentication')
const postTransfers = require('../fixtures/postTransfers.json')

require('dotenv').config()

describe('Transfers', () => {
  describe('POST /transferencias', () => {
    let token
    beforeEach(async () => {
      token = await getToken('julio.lima', '123456')
    })

    it('must return 201 when the amount transferred is equal or greater than R$10,00', async () => {
      const bodyTransfer = { ...postTransfers }

      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransfer)

      expect(response.status).to.equal(201)
    })

    it('must return 422 when the amount transferred is less than R$10,00', async () => {
      const bodyTransfer = { ...postTransfers }
      bodyTransfer.valor = 8

      const response = await request('http://localhost:3000')
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransfer)

      expect(response.status).to.equal(422)
    })
  })
})
