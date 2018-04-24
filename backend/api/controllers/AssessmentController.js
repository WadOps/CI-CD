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
        
    }

};

