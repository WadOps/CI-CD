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
        
		if (!username || !password) {
			return res.json({
                success: false, 
                data: "You must provide a username/password in the request body",
            })
		}

		const { user, pass, role} = sails.config.orgAdmin
		if (username !== user || password !== pass) {
            User.findOne({name: username}).then(user => {
                if (user) {
                    let token = jwt.sign({ userId: user.id }, secret)
                    res.json({
                        success: true, 
                        data: {token: token , user: user}
                    })
                } else {
                    return res.json({
                        success: false, 
                        data: "Authentication failed. Wrong username/password"
                    })
                }
            })
		} else {
			let token = jwt.sign({ user, pass }, secret)
			res.json({
                success: true, 
                data:{token: token, user:{ user, role}}
            })
		}
    },
    
    addUser(req,res) {
        User.create({ name: req.body.name, password: req.body.password}).then(user => {
            res.json({
                success: true
            })
        })
    }

};

