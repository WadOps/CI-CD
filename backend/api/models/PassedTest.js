/**
 * PassedTest.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    test : { model: 'test'},
    candidate : { model: 'candidate'},
    starttime : {type: 'string', required: true},
    score : { type: 'int', defaultsTo: 0},
    qsts : { type: 'array'}

  },

};

