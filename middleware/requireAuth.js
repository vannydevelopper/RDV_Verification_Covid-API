const jwt = require('jsonwebtoken')
const requireAuth = (req, res, next) =>{
    if (req.userId) {
        next()
    }
    else {
        res.status(403).json({
            message: "Vous devez vous connecter pour continuer"
        })
    }
}

module.exports = requireAuth