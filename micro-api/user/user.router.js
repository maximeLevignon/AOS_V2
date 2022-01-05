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

/**
 * Retourne tous les membres de comités
 */
router.get('/MDC/login' , (req, res) =>{
  User.find({roles : "Membre du comité"},{ login : 1, _id : 0})

        .then(mdc => res.status(StatusCodes.OK).json(mdc))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})

module.exports = router ;
