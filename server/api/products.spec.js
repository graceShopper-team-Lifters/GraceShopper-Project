const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Product } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app');

describe('Product routes', () => {
    beforeEach(async() => {
        await seed();
    })

    describe('/api/products/', () => {
        it('GET/api/products', async() => {
            const res = await request(app)
              .get('/api/products')
              .expect(200)
            expect(res.body).to.be.an('array')
        })
    })

    describe('/api/products/:category', async() => {
        it('should return products of the specified category', async() => {
            const category = 'Patience';

            const res = await request(app)
              .get(`/api/products/${category}`)
              .expect(200)
            expect(res.body).to.be.an('array')
        })
    })

    describe('/api/products/:id', async() => {
        it('should return product based on id', async() => {
            const id = 1;

            const res = await request(app)
             .get(`/api/products/${id}`)
             .expect(200)
            expect(res.body).to.be.an('array')
        })
    })
})