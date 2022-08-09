const jwt = require('jsonwebtoken')
const bindUser = (req, res, next) =>{
    const bearer = req.headers.authorization
    const bearerToken = bearer && bearer.split(' ')[1]
    if (bearerToken) {
        jwt.verify(bearerToken, 'fffffcccckkkkpppp',(error, user) =>{
            if (user){
                req.userId = user.user
            }
        })
    }
    next()
}

module.exports =bindUser