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
        Candidate.find().then((candidates) => {
            
            res.json({
                success:true,
                data: candidates
            })

        })
    },

    addscore(req,res) {
        var jwt = require('jsonwebtoken')
        let score = req.body.score
        var token = req.body.token
        var decoded = jwt.decode(token);
        Candidate.update({email: decoded.email},{score: score}).then((candidate) => {})
    }
	
};

