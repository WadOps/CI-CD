/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    authenticate(req,res) {
        let { username, password } = req.body
        const jwt = require('jsonwebtoken')
        const secret = sails.config.jwtSecret
        
		if (!email || !password) {
			return res.json({
                success: false, 
                data: "You must provide a username/password in the request body",
            })
		}

		const { superuser, pass, role} = sails.config.orgAdmin
		if (email !== superuser || password !== pass) {
            User.findOne({email: username}).then(user => {
                if (user) {
                    Passwords.checkPassword({passwordAttempt: password, encryptedPassword: user.password}).exec({
                        error: function (err) {
                            return res.json({
                                success: false, 
                                data: "Error occured",
                                error: err
                            })
                        },
                        incorrect: function () {
                            return res.json({
                                success: false, 
                                data: "Authentication failed. Wrong username/password"
                            })
                        },
                        success: function () {
                            let token = jwt.sign({ userId: user.id }, secret)
                            return res.json({
                                success: true, 
                                data: {token: token , user: user}
                            })
                        },
                    })
                } else {
                    return res.json({
                        success: false, 
                        data: "Authentication failed. Wrong username/password"
                    })
                }
            })
		} else {
			let token = jwt.sign({ superuser, pass }, secret)
			res.json({
                success: true, 
                data:{token: token, user:{ superuser, role}}
            })
		}
    },
    
    addUser(req,res) {
        User.create({ email: req.body.user.email, password: req.body.user.pass, name: req.body.user.name}).then(user => {
            res.json({
                success: true
            })
        }).catch(err=>{
            console.log(err)
        })
    },

    getUsers(req,res) {
        User.find().populateAll().then((users) => {
            
            res.json({
                success:true,
                data: users
            })

        })
    },

    updateUser(req,res) {
        User.update({id: req.body.id},{ email: req.body.user.email, password: req.body.user.pass, name: req.body.user.name}).then((user) => {
            return res.json({
                success: true,
                data: user
            })
        })
    },

    async deleteUser(req,res) {
        await User.destroy({id: req.params.id}).exec(function(err) {
            if(err) {
                return res.json({
                    success: false,
                    data: "error in User delete",
                    error: err
                });
            } else {
                return res.json({
                    success:true
                })
            }
        })
    },

    sendmailtoUser(req,res) {
        sails.log.debug('try to send mail');

        const Email = require('email-templates');

        const email = new Email({
        message: {
            from: 'technical.screening.hf@gmail.com'
        },
        send: true,
        transport: {
            service: "Gmail",
            auth: {
                user: "technical.screening.hf@gmail.com",
                pass: "hiddenfounders"
            },
            tls: {
                rejectUnauthorized: false
            }
        }
        });

        email
            .send({
                template: 'infoTemplates',
                message: {
                    to: req.body.user.email,
                    subject: req.body.subject
                },
                locals: {
                    message: req.body.message,
                    info: req.body.info
                }
            })
            .then(() => {
                console.log
                return res.json({
                    success: true,
                    data : "Email sent"
                })
            })
            .catch(console.error);
        }
	

};

