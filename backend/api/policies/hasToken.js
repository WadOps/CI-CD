var jwt = require('jsonwebtoken')

module.exports = function hasToken(req, res, next) {
	let token = req.headers.authorization
	if (token) {
		jwt.verify(token, sails.config.jwtSecret, function(err, decoded) {
			if (err) {
				return res.json({
                    success: false, 
					data: "Not authorized",
					error: err
                })
			} else {
				next()
			}
		})
	} else {
		return res.json({
			success: false,
			data: "Not authorized"
		})
	}
}