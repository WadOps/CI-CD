/**
 * CandidateController
 *
 * @description :: Server-side logic for managing candidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    generate(req,res) {
        var jwt = require('jsonwebtoken')
        baseurl = "localhost:8081"
        testid = req.body.id
        mail = req.body.email

        Candidate.create({email: mail, affectedtest: testid}).then(() => {
            var token = jwt.sign({ id: testid,email: mail },mail,{ algorithm: 'none'});
            var url = baseurl+"/"+token
            res.json({
                data: url
            })
        })
    },

    getCandidates(req,res) {
        Candidate.find().populateAll().then((candidates) => {
            
            res.json({
                success:true,
                data: candidates
            })

        })
    },

    

    addscore(req,res) {
        var jwt = require('jsonwebtoken')
        var score = req.body.score
        var token = req.body.token
        var decoded = jwt.decode(token);
        Candidate.update({email: decoded.email},{score: score}).then((candidate) => {})
    },

    async addCandidateAnswer(req,res) {
        var jwt = require('jsonwebtoken')
        var qsts = []
        var token = req.body[0].token
        var decoded = jwt.decode(token)
        for(let i in req.body) {
            var duo = []
            var prmses =[]
            var prms = await Question.findOne({id : req.body[i].idqst}).then(qst => {
                duo.push(qst)
            })
            prmses.push(prms)
            var prms = await Answer.findOne({id : req.body[i].idanswer}).then(asw => {
                duo.push(asw)
            })
            prmses.push(prms)
            await Promise.all(prmses).then(() => {
                qsts.push(duo)
            })
        }
        Candidate.findOne({email: decoded.email}).then((candidate) => {
            Test.findOne({id: decoded.id}).then((test) => {
                PassedTest.create({test: test, candidate: candidate, qsts: qsts}).catch(err => {
                    return res.json({
                        success: false,
                        error: "error in Passed Test creation",err
                    });
                })
            })
        })
            // Candidate.findOne({email: decoded.email}).then((candidate) => {
            //             Answer.findOne({id : req.body[i].idanswer}).then(asw => {
            //                 asw.chosenby_candidates.add(candidate.id)
            //                 asw.save()
            //                 candidate.answers.add(asw.id)
            //                 candidate.save()
            //             }).catch((err) => {
            //                 candidate.answers.remove(asw.id)
            //                 candidate.save()
            //                 return res.json({
            //                     success: false,
            //                     error: "error: ",err
            //                 });
            //             })
            // })
    
    }
	
};

