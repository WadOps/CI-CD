/**
 * Answer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    qst_id: { model: 'question', required: true},
    desc : { type: 'string', required: true},
    istrue : { type: 'boolean', defaultsTo: false},
    // chosenby_candidates : { collection: 'candidate', via: 'answers'}
  }
};

