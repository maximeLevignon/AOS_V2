let express = require('express')
let router = express.Router()
let User = require('../user/user.model')
let jwt = require('jsonwebtoken')
let StatusCodes = require('http-status-codes').StatusCodes

/**
 * Authentification d'un User, utilisé sur connexion
 */

router.post('/', (req, res) =>{
    User.findOne({ login: req.body.login, password: req.body.password })
    .then(user => {
        if(user){
            const jwtToken = jwt.sign(
                {id : user._id, roles : user.roles},
                "FSFLKS?FKM%SF",
                {expiresIn : 3600}
            )
            res.status(StatusCodes.OK).json({jwt : jwtToken})
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({error :error})
        }
    })
    .catch(error => res.status(404).json({ error }))
})

module.exports = router ;
