let express = require('express')
let router = express.Router()
let Conference = require('./conference.model')
let StatusCodes = require('http-status-codes').StatusCodes
let cookies = require('cookies')
let validateJWT = require('../auth/validatorToken')

/**
* Retourne toutes les conférences
*/
router.get('/', (req, res) => {
    Conference.find({})
        .then(conference => res.status(StatusCodes.OK).json(conference))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({error}))
});


/**
 * Retourne les titres de toutes les conférences 
 */
router.get('/titres', (req, res) => {
    Conference.find({}, {titre: 1, _id: 0})
        .then(conference => res.status(StatusCodes.OK).json(conference))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({error}))
});

/**
 * Créé une conférence
 * Vérifie la clé privée du JWT
 */
router.post('/', (req, res) => {
    let payload = validateJWT(req?.headers?.authorization)
    if (payload) {
        const conference = new Conference({
            titre: req.body.titre,
            domaine: req.body.domaine,
            organisateur: payload.id,
            membre_comite_selection: req.body.membre_comite_selection,
            date_contrib_fin: req.body.date_contrib_fin,
            date_event_debut: req.body.date_event_debut,
            date_event_fin: req.body.date_event_fin,
        });

        conference.save().then(() => {
            res.status(StatusCodes.OK).json(conference)
        }).catch(
            (error) => {
                res.status(StatusCodes.BAD_REQUEST).json({
                    error: error
                });
            }
        );
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error: "UNAUTHORIZED"})
    }
})

/**
 * Retourne toutes les conférences où la personne connectée est MDC
 */
 router.get('/MDC', (req, res) => {
    let payload = validateJWT(req?.headers?.authorization)
    if(payload){
        let id = payload.id
        console.log(id)
        //recuperer toutes les conférences où organisateur = id
        Conference.find({membre_comite_selection : id})
        .then(conference => {
            console.log(conference)
            res.status(StatusCodes.OK).json(conference)
        })
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({error}))
    } else{
        res.status(StatusCodes.UNAUTHORIZED).json({error: "UNAUTHORIZED"})
    }
 });

module.exports = router ;
