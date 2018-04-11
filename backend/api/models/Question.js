/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    test_id : { model: 'test', required: true},
    desc : { type:'string', required: true},
    answers : { collection: 'answer', via: 'qst_id'},
    passedtests : { colection: 'passedTest', via: 'qsts'},
    
  }
};

