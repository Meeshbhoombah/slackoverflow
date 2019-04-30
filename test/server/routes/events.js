const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/server/app.js');
const should = chai.should();

chai.use(chaiHttp);

describe('Handle slack events @ /event', () => {
  describe('member-joined-channel', () => {
    it('Should create a user and send the onboard message', () => {

      const evt = {
        type: 'member_joined_channel',
      }

      chai.request(server) 
      .post('/event')
      .send(evt)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });

    });
  });
});
