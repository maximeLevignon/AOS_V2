let express = require('express')
let router = express.Router()
let User = require('./user.model')
const validateJWT = require("../auth/validatorToken");
let StatusCodes = require('http-status-codes').StatusCodes


/**
 * Crée un User, utilisé sur inscription
 */
router.post('/', (req, res) =>{
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        roles: req.body.roles,
    });

    user.save().then(() => {
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
 * Retourne les users
 */
router.get('/' , (req, res) =>{
    User.find()
        .then(user => res.status(StatusCodes.OK).json(user))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})

/**
 * Retourne un Auteur selon son Id
 */
router.get('/Auteur/login' , (req, res) =>{
    let payload = validateJWT(req?.headers?.authorization)
    console.log(payload)
    let id = payload.id
    if (payload.roles.includes("Auteur")){
        User.findById(id)
            .then(auteur => res.status(StatusCodes.OK).json(auteur))
            .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error : "UNAUTHORIZED"})
    }
})

/**
 * Retourne un Organisateur selon son Id
 */
router.get('/Organisateur/login' , (req, res) =>{
    let payload = validateJWT(req?.headers?.authorization)
    console.log(payload)
    let id = payload.id
    if (payload.roles.includes("Organisateur")){
        User.findById(id)
            .then(organisateur => res.status(StatusCodes.OK).json(organisateur))
            .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error : "UNAUTHORIZED"})
    }
})

/**
 * Retourne un Reviewer selon son Id
 */
router.get('/Reviewer/login' , (req, res) =>{
    let payload = validateJWT(req?.headers?.authorization)
    console.log(payload)
    let id = payload.id
    if (payload.roles.includes("Reviewer")){
        User.findById(id)
            .then(reviewer => res.status(StatusCodes.OK).json(reviewer))
            .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error : "UNAUTHORIZED"})
    }
})

/**
 * Retourne un Membre du comité selon son Id
 */
router.get('/MDC/login' , (req, res) =>{
    let payload = validateJWT(req?.headers?.authorization)
    console.log(payload)
    let id = payload.id
    if (payload.roles.includes("Membre du comité")){
        User.findById(id)
            .then(mdc => res.status(StatusCodes.OK).json(mdc))
            .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error : "UNAUTHORIZED"})
    }
})

/**
 * Retourne tous les Membres du comité
 */
router.get('/MDC' , (req, res) => {
    User.find({roles: "Membre du comité"})
        .then(mdc => res.status(StatusCodes.OK).json(mdc))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({error}))
})
module.exports = router ;
