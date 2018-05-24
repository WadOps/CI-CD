/**
 * Assessment.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', required: true},
    candidate: { model: 'candidate'},
    tests : { collection: 'test'},
    difficulty : { type: 'string' , required: true},
    time : { type: 'string' , required: true },
    techstack : { type: 'array' },

  },

};

