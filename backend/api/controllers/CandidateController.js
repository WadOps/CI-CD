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

    addCandidateAnswer(req,res) {
        var jwt = require('jsonwebtoken')
        for(let i in req.body) {
            var token = req.body[i].token
            var decoded = jwt.decode(token);
            Candidate.findOne({email: decoded.email}).then((candidate) => {
                        Answer.findOne({id : req.body[i].idanswer}).then(asw => {
                            asw.chosenby_candidates.add(candidate.id)
                            asw.save()
                            candidate.answers.add(asw.id)
                            candidate.save()
                        }).catch((err) => {
                            candidate.answers.remove(asw.id)
                            candidate.save()
                            return res.json({
                                success: false,
                                error: "error: ",err
                            });
                        })
            })
        }
    }
	
};

