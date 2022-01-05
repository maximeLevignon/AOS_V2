let express = require('express')
let router = express.Router()
let Conference = require('./conference.model')
let StatusCodes = require('http-status-codes').StatusCodes
let cookies = require('cookies')
/*
* Retourne toutes les conférences
*/
router.get('/', (req, res) => {

    Conference.find({}) 
 
    .then(conference => res.status(StatusCodes.OK).json(conference))
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
});


/**
 * Retourne les titres de toutes les conférences 
 */
 router.get('/titres', (req, res) => {

    Conference.find({}, {titre : 1, _id : 0})

    .then(conference => res.status(StatusCodes.OK).json(conference))
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
});

/**
 * Créé une conférence
 * TODO : voir avec le JWT pour que l'organisateur soit l'user
 */
router.post('/', (req, res) => {
    let token = localStorage.getItem("token");
    console.log(token)
    /*const conference = new Conference({
        titre: req.body.titre,
        domaine: req.body.domaine,
        organisateur: req.body.organisateur,
        membre_comite_selection: req.body.membreDuComite,
        date_contrib_fin: req.body.dateContribFin,
        date_event_debut: req.body.dateEventDebut,
        date_event_fin: req.body.dateEventFin,
    });

    console.log("avant le save")
    conference.save().then(() =>{
        res.status(StatusCodes.OK).json(conference)
    }).catch(
        (error) => {
          res.status(StatusCodes.BAD_REQUEST).json({
            error: error
          });
        }
    );*/
})


module.exports = router ;