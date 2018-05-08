/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', required: true, unique: true},
    email: { type: 'string', unique: true, required: true},
    password: { type: 'string', required: true},
    role: { type: 'string', enum: ['Admin', 'User'], defaultsTo : 'User'},
    candidates: { collection: 'candidate'},
    assessments: { collection: 'assessment'},
    tests: {collection: 'test'}

  },

  beforeCreate: function(user, cb) {
    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    
    Passwords.encryptPassword({
    
      password: user.password,
      
      }).exec({
      
      // An unexpected error occurred.
      
      error: function (err) {
        cb(err)
      },
      
      // OK.
      
      success: function (result) {
        user.password=result
        cb()
      },
    
    }); 
  },

  beforeUpdate: function(user, cb) {
    var Passwords = require('machinepack-passwords');
    Passwords.encryptPassword({ password: user.password}).exec({
      error: function (err) {
        cb(err)
      },
      success: function (result) {
        user.password=result
        cb()
      },
    }); 
  }

};

