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
    }
  

};

