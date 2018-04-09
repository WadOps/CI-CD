/**
 * Candidate.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email : { type: 'string', unique: true},
    affectedtest : { model: 'test'},
    score : { type: 'int', defaultsTo: 0},
    qsts_answered : { collection: 'question', via: 'candidate_id' }
  }
};
