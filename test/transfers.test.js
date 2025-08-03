const request = require('supertest')
const { expect } = require('chai')
const { getToken } = require('../helpers/authentication')
const postTransfers = require('../fixtures/postTransfers.json')

require('dotenv').config()

describe('Transfers', () => {
  let token
  beforeEach(async () => {
    token = await getToken('julio.lima', '123456')
  })

  describe('POST /transferencias', () => {
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

      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransfer)

      expect(response.status).to.equal(422)
    })
  })

  describe('GET /transferencias{id}', () => {
    it('must return 200 when data matches with data store in the table when having valid ID', async () => {
      const response = await request(process.env.BASE_URL)
        .get('/transferencias/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).to.equal(200)
      const { id, conta_origem_id, conta_destino_id, valor, data_hora } =
        response.body
      expect(id).to.equal(1)
      expect(conta_origem_id).to.equal(1)
      expect(conta_destino_id).to.equal(2)
      expect(valor).to.equal('150.00')
      expect(data_hora).to.equal('2025-08-01T01:40:45.000Z')
    })
  })

  describe('GET /transferencias', () => {
    it('must return 200 when pagination returns a limit of 10', async () => {
      const response = await request(process.env.BASE_URL)
        .get('/transferencias?page=1&limit=10')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      const { page, limit, transferencias } = response.body
      expect(response.status).to.equal(200)
      expect(page).to.equal(1)
      expect(limit).to.equal(10)
      expect(transferencias.length).to.equal(10)
    })
  })
})
