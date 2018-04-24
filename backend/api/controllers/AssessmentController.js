/**
 * AssessmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    addAssessment(req,res) {
        Assessment.create({name: req.body.name, candidate: req.body.candidate, tests: req.body.tests, difficulty: req.body.diff, time: req.body.timelimit, techstack: req.body.techstack}).then((assessment) => {
            // console.log(assessment)
            Assessment.findOne({id: assessment.id}).populateAll().then((test) => {
                console.log(test)
            })
        }).catch(err => {
            console.log(err)
        })    
    },

    getAssessment(req,res) {
        Assessment.find().populateAll().then((assessments) => {
                res.json({
                    success: true,
                    data: assessments
                })
        })
    },

    updateExptime(req,res) {
        Assessment.update({id: req.body.id},{time: req.body.time}).then(() => {
            return res.json({
                success: true
            })
        })
    },

    deleteAssessment(req,res) {
        Assessment.destroy({id: req.params.id}).exec(function(err) {
            if(err) {
                return res.json({
                    success: false,
                    data: "error in Assessment delete",
                    error: err
                });
            } else {
                return res.json({
                    success:true
                })
            }
        })
    }

};

