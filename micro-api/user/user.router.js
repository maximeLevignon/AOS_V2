let express = require('express')
let router = express.Router()
let User = require('./user.model')
let StatusCodes = require('http-status-codes').StatusCodes


//Créé un User, utilisé sur inscription
router.post('/', (req, res) =>{

    const user = new User({
        login: req.body.login,
        password: req.body.password,
        roles: req.body.roles,
    });
    console.log(req.body)
      user.save().then(()=> {
          res.status(StatusCodes.OK).json(user)
      }).catch(
        (error) => {
          res.status(StatusCodes.BAD_REQUEST).json({
            error: error
          });
        }
      );
})

module.exports = router ;
