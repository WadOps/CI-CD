/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  'POST /tests' : 'TestController.create', //bo
  'GET /tests' : 'TestController.get', //bo
  'GET /gettest/:token' : 'TestController.getOneWithToken',

  'POST  /generateurl' : 'CandidateController.generate', //bo
  'GET /candidates' : 'CandidateController.getCandidates', //bo
  'POST /candidates/crud' : 'CandidateController.addCandidates', //bo
  'DELETE /candidates/crud/:id' : 'CandidateController.deleteCandidate', //bo
  'PUT /candidates/crud' : 'CandidateController.updateCandidate', //bo
  'POST /sendmail' : 'CandidateController.sendmailtoCandidate', //bo
  // 'POST /endtest' : 'CandidateController.addscore',
  'POST /candidateanswers' : 'CandidateController.addCandidateAnswer', 

  'GET /passedtests' : 'PassedTestController.getPassedTest',
  'POST /createpassed' : 'PassedTestController.initPassedTest',
  'GET /checkpassed/:token' : 'PassedTestController.getOnePassedTest',

  'POST /assessments/crud' : 'AssessmentController.addAssessment', //bo
  'PUT /assessments/crud' : 'AssessmentController.updateExptime', //bo
  'GET /assessments' : 'AssessmentController.getAssessment', //bo
  'DELETE /assessments/crud/:id' : 'AssessmentController.deleteAssessment', //bo

  'POST /authenticate': 'UserController.authenticate', 
  'GET /users' : 'UserController.getUsers', //bo
  'POST /users/crud' : 'UserController.addUser', //bo
  'PUT /users/crud' : 'UserController.updateUser', //bo
  'DELETE /users/crud/:id' : 'UserController.deleteUser', //bo
  'POST /sendinfomail' : 'UserController.sendmailtoUser', //bo

  

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': {
  //   view: 'homepage'
  // }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
