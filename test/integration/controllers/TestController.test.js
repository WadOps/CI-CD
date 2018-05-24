var supertest = require('supertest')
var should = require('should')
// var sails = require('sails')

const TEST = require('../../data/test.json').test

describe('User Controller', function () {
        before(function (done) {
            const { superuser, pass} = sails.config.orgAdmin
            let user = Object.assign({username: superuser, password: pass})
            supertest(sails.hooks.http.app)
                .post('/authenticate')
                .send(user)
                .expect(res => should.strictEqual(res.body.success, true, res.body.data))
                .end(function (err, res) {
                    if (err) return done(err);
                    userName = res.body.data.user;
                    userToken = res.body.data.token;
                    done(null, sails);
                });
        });
  
        describe('#createTest', function () {
            it('should not create test if not connected', function (done) {
                supertest(sails.hooks.http.app)
                    .post('/tests')
                    .send(TEST)
                    .expect(res => should.strictEqual(res.body.success, false,res.body.data))
                    .end(function (err, res) {
                        if (err) return done(err);
                        should.exist(res.body);
                        done();
                    });
            });
            it('should create test successfully', function (done) {
            supertest(sails.hooks.http.app)
                .post('/tests')
                .set('authorization', userToken)
                .send(TEST)
                .expect(res => should.strictEqual(res.body.success, true, res.body.data))
                .end(function (err, res) {
                    if (err) return done(err);
                    should.exist(res.body.data);
                    done();
                });
            })
        })
    })