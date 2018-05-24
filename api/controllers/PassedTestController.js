/**
 * PassedTestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getPassedTest(req,res) {
        PassedTest.find().populateAll().then((passedtests) => {
            
            res.json({
                success: true,
                data: passedtests
            })

        })        
    },

    initPassedTest(req,res) {
        var jwt = require('jsonwebtoken')
        var moment = require('moment')
        var token = req.body.token
        var time = moment(req.body.starttime).format()
        var decoded = jwt.decode(token)
        Candidate.findOne({email: decoded.email}).then((candidate) => {
            Test.findOne({id: decoded.id}).then((test) => {
                PassedTest.create({test: test, candidate: candidate, starttime: time}).then((passedtest) => {
                    return res.json({
                        success: true,
                        data: passedtest.id
                    });
                }).catch(err => {
                    console.log(err)
                    return res.json({
                        success: false,
                        data: "error in Passed Test creation",
                        error: err
                    });
                })
            })
        })
    },

    getOnePassedTest(req,res) {
        var jwt = require('jsonwebtoken')
        var token = req.params.token
        var decoded = jwt.decode(token);
        Candidate.findOne({email: decoded.email}).then((candidate) => {
            PassedTest.findOne({test: decoded.id, candidate: candidate.id}).then(passedtest =>{
                res.json({
                    success: true,
                    data: passedtest
                })
            })
        })
    }
  

};

