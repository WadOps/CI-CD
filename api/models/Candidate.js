/**
 * Candidate.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string' },
    email : { type: 'string', unique: true, required: true},
    // affectedtest : { model: 'test'},
    // Passedtests: { collection: 'passedTest', via: 'candidate'}
  },

  afterDestroy: function(destroyed, cb) {
    PassedTest.find({candidate: destroyed[0].id}).then((passedtests) => {
		for(let i in passedtests) {
			PassedTest.destroy({id: passedtests[i].id}).catch((err) => {
				return res.json({
					success: false,
					data: "error in Passed Test delete",
					error: err
				});
			})
		}
	})
	cb()
  }
};

