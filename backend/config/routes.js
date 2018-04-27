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

  'POST /tests' : 'TestController.create',
  'GET /tests' : 'TestController.get',
  'GET /gettest/:token' : 'TestController.getOneWithToken',
  'POST  /generateurl' : 'CandidateController.generate',
  'GET /candidates' : 'CandidateController.getCandidates',
  'POST /candidates/crud' : 'CandidateController.addCandidates',
  'DELETE /candidates/crud/:id' : 'CandidateController.deleteCandidate',
  'PUT /candidates/crud' : 'CandidateController.updateCandidate',
  'POST /sendmail' : 'CandidateController.sendmailtoCandidate',
  // 'POST /endtest' : 'CandidateController.addscore',
  'POST /candidateanswers' : 'CandidateController.addCandidateAnswer',
  'GET /passedtests' : 'PassedTestController.getPassedTest',
  'POST /createpassed' : 'PassedTestController.initPassedTest',
  'GET /checkpassed/:token' : 'PassedTestController.getOnePassedTest',
  'POST /assessments/crud' : 'AssessmentController.addAssessment',
  'PUT /assessments/crud' : 'AssessmentController.updateExptime',
  'GET /assessments' : 'AssessmentController.getAssessment',
  'DELETE /assessments/crud/:id' : 'AssessmentController.deleteAssessment',
  'POST /authenticate': 'UserController.authenticate',
  'POST /users/crud' : 'UserController.addUser',
  // 'DELETE /users/crud/:id' : 'UserController.deleteUser',
  // 'PUT /users/crud' : 'UserController.updateUser',
  

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
