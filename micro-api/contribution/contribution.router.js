let express = require('express')
let router = express.Router()
let Contribution = require('./contribution.model')
const validateJWT = require("../auth/validatorToken");
let StatusCodes = require('http-status-codes').StatusCodes

/**
 *Retourne les contributions
 */
router.get('/', (req, res) =>{
    const filter = {}
    if(req.query.idConference){
        filter.idConference = req.query.idConference
    }
    Contribution.find(filter, {})
        .then(contributions => res.status(StatusCodes.OK).json(contributions))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})

/**
*Retourne la contributions en fonction de son Id
*/
router.get('/:id', (req, res) =>{
    let id = req.params.id
    Contribution.findById(id)
        .then(contributionsById => res.status(StatusCodes.OK).json(contributionsById))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})

/**
 * Crée une contribution et met le fichier pdf dans contributions
 */
router.post('/', (req, res) => {
    let payload = validateJWT(req?.headers?.authorization)
    console.log(payload)
    console.log(req.body)
    console.log(req.files)
    //let fichierRecu = req.files.fichierContribution
    //let fichierRecu = req.body.fichier;
    //console.log(fichierRecu);
    //fichierRecu.mv(__dirname + '/../PDF_Files/' + fichierRecu.name, function(err) {
    if(payload){
        const contribution = new Contribution({
            auteur: payload.id,
            titre: req.body.titre,
            idConference: req.body.idConference,
            statut: req.body.statut,
            date_publication: new Date(),
            notes: req.body.notes
            //fichier: "PDF_Files/" + fichierRecu
        });

        contribution.save().then(() => {
            res.status(StatusCodes.OK).json(contribution)
        }).catch(
            (error) => {
                res.status(StatusCodes.BAD_REQUEST).json({error: error});
            }
        )
    } else {
        res.status(StatusCodes.UNAUTHORIZED)
    }
});
//});

router.post('/:id/notes', (req, res) => {
    let payload = validateJWT(req?.headers?.authorization)
    if (payload) {
        let id = req.params.id
        Contribution.findById(id)
            .then(async contribution => {
                contribution.notes.push(req.body.note)
                await contribution.save()
                res.status(StatusCodes.OK).json(contribution)
            }).catch(
            (error) => {
                res.status(StatusCodes.BAD_REQUEST).json({error: error});
            }
        )
    } else {
        res.status(StatusCodes.UNAUTHORIZED)
    }
})
module.exports = router ;