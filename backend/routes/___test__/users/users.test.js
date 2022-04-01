const request = require('supertest');
const app = require('../../../server');


 describe('user registration',() => {
    it('responds with json', async function() {
        const response = await request(app)
          .get('/api/users/register')
          .set('Accept', 'application/json')
          .send( {
            "cellNumber":"0249855932",
            "firstName":"Emmanuel",
            "lastName":"Teye",
            "email":"emmateye422@gmail.com",
            "password":"123456"
        })
          expect(response.status).toEqual(201);
          expect(response.body.email).toEqual('foo@bar.com');
      });
    
      it('should return 1',()=> {
        expect(1).toBe(1)
      });
 })

