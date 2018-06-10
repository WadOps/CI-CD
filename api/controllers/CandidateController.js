/**
 * CandidateController
 *
 * @description :: Server-side logic for managing candidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://tech.quiz.sdrm.me:8081'
} else {
    baseURL = 'http://localhost:8081'
}

module.exports = {
    
    generate(req,res) {
        var moment = require('moment')
        var jwt = require('jsonwebtoken')
        baseurl = baseURL
        testid = req.body.id
        mail = req.body.email
        expdate = req.body.expdate

        Candidate.findOrCreate({email: mail}).then((candidate) => {
            try {
                var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + moment(expdate,"YYYY-MM-DD").diff(moment().startOf('day'), 'seconds'), id: testid,email: mail },mail,{ algorithm: 'none'});
                var url = baseurl+"/"+token
                res.json({
                    data: url
                })
            }
            catch(error) {
                // Candidate.destroy({id: candidate.id})
                return res.json({
                    success: false,
                    data: "Test not affected to candidate",
                    error: error
                });
            }
        })
    },

    addCandidates(req,res) {
        let nonecreated = []
        for(let i in req.body.candidates) {
            Candidate.create({name: req.body.candidates[i].name, email: req.body.candidates[i].email}).catch((err) => {
                nonecreated.push(i)
            })
        }
        if( nonecreated.length == 0)
            return res.json({
                success:true
            })
        else 
            return res.json({
                success: false,
                data: "error in creating candidates "+nonecreated,
                error: err
            });
    },

    getCandidates(req,res) {
        Candidate.find().populateAll().then((candidates) => {
            
            res.json({
                success:true,
                data: candidates
            })

        })
    },

    

    // addscore(req,res) {
    //     var jwt = require('jsonwebtoken')
    //     var score = req.body.score
    //     var token = req.body.token
    //     var decoded = jwt.decode(token);
    //     Candidate.update({email: decoded.email},{score: score}).then((candidate) => {})
    // },

    async addCandidateAnswer(req,res) {
        var qsts = []
        for(let i in req.body.qsts) {
            var duo = []
            var prmses =[]
            var prms = await Question.findOne({id : req.body.qsts[i].idqst}).then(qst => {
                duo.push(qst)
            })
            prmses.push(prms)
            var prms = await Answer.findOne({id : req.body.qsts[i].idanswer}).then(asw => {
                duo.push(asw)
            })
            prmses.push(prms)
            await Promise.all(prmses).then(() => {
                qsts.push(duo)
            })
        }
        PassedTest.update({id: req.body.id},{score: req.body.score, qsts: qsts}).then((pt) => {}).catch(err => {
            return res.json({
                success: false,
                data: "error in Passed Test save",
                error: err
            });
        })
    },

    async deleteCandidate(req,res) {
        await Candidate.destroy({id: req.params.id}).exec(function(err) {
            if(err) {
                return res.json({
                    success: false,
                    data: "error in Candidate delete",
                    error: err
                });
            } else {
                return res.json({
                    success:true
                })
            }
        })
    },

    updateCandidate(req,res) {
        Candidate.update({id: req.body.id},{name: req.body.candidates[0].name, email:req.body.candidates[0].email}).then((candidate) => {
            return res.json({
                success: true,
                data: candidate
            })
        })
    },

    sendmailtoCandidate(req,res) {
        sails.log.debug('try to send mail');

        const Email = require('email-templates');

        const email = new Email({
        message: {
            from: 'technical.screening.hf@gmail.com'
        },
        send: true,
        transport: {
            service: "Gmail",
            auth: {
                user: "technical.screening.hf@gmail.com",
                pass: "hiddenfounders"
            },
            tls: {
                rejectUnauthorized: false
            }
        }
        });

        email
            .send({
                template: 'emailTemplates',
                message: {
                    to: req.body.email,
                    subject: req.body.subject
                },
                locals: {
                    name: req.body.name,
                    message: req.body.message,
                    link: req.body.link
                }
            })
            .then(() => {
                console.log
                return res.json({
                    success: true,
                    data : "Email sent"
                })
            })
            .catch(console.error);
        }
	
};

