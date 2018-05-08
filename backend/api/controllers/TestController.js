/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create(req,res) { 
        let data = req.body.questions
        Test.create({difficulty: req.body.diff, time: req.body.timelimit, techstack: req.body.techstack}).then((test) => {
            for(let i in req.body.questions) {
                Question.create({test_id: test.id, desc: data[i].desc}).then((question) => {
                    for(let j in data[i].answers) {
                        let asw = data[i].answers[j]
                        Answer.create({qst_id: question.id, desc: asw.desc, istrue: asw.istrue}).catch((err) => {
                            Question.destroy({id: question.id})
                            return res.json({
                                success: false,
                                data: "error in answer creation",
                                error:err
                            });
                        })
                    }
                }).catch((err) => {
                    Test.destroy({id: test.id})
                    return res.json({
                        success: false,
                        data: "error in question creation",
                        error: err
                    });
                })
            }
            Test.findOne({id: test.id}).populateAll().then((test) => {
                return res.json({
                    success: true,
                    data: test
                });
            })
        }).catch((err) => {
            return res.json({
                success: false,
                data: "error in test creation",
                error: err
            });
        })
    },

    get(req,res) {
        Test.find().populateAll().then((tests) => {
            var prmses = []
            for(let i in tests) {
                var prms = Question.find({test_id: tests[i].id}).populate('answers').then((qsts) => {
                    tests[i] = tests[i].toObject()
                    tests[i].qsts = qsts;
                })
                prmses.push(prms)
            }
            Promise.all(prmses).then(() => {
                res.json({
                    success: true,
                    data: tests
                })
            })

        })
    },

    getOneWithToken(req,res) {
        var jwt = require('jsonwebtoken')
        var token = req.params.token
        
        var decoded = jwt.verify(token,'',(err,decoded)=>{
            if(err) {
                return res.json({
                    success: "expired",
                    data: "Token Expired",
                    error: err
                });
            } else {
                Test.findOne({id: decoded.id}).populateAll().then((test) => {
                    var prmses = []
                    var prms = Question.find({test_id: test.id}).populate('answers').then((qsts) => {
                        test = test.toObject()
                        test.qsts = qsts;
                    })
                    prmses.push(prms)
                    Promise.all(prmses).then(() => {
                        res.json({
                            success: true,
                            data: test
                        })
                    })
                })
                .catch((err) => {
                    console.log("test not found")
                    return res.json({
                        success: false,
                        data: "Test not found",
                        error: err
                    });
                })
            }
        });
    }
	
};

