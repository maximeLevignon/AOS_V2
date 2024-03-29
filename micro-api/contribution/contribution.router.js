let express = require('express')
let router = express.Router()
let Contribution = require('./contribution.model')
const validateJWT = require("../auth/validatorToken");
let StatusCodes = require('http-status-codes').StatusCodes
const multer  = require('multer');
const { then } = require('../database');
const path = require('path')
const {UNAUTHORIZED} = require("http-status-codes");

/**
 * Nécessaire pour le transfert de fichier,
 * Paramètre la destination du fichier lors de la création de la contribution
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './contribution/PDF_Files/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //Appending .pdf
    }
})
  const upload = multer({ storage: storage });

/**
 * Retourne les contributions,
 * Filres les contributions par l'Id de conférence
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
* Retourne la contribution en fonction de son Id
*/
router.get('/:id', (req, res) =>{
    let id = req.params.id
    Contribution.findById(id)
        .then(contributionsById => res.status(StatusCodes.OK).json(contributionsById))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})

/**
 * Retourne le fichier selon l'Id de la contribution
 */
router.get('/:id/fichier', (req, res) =>{
    let id = req.params.id
    Contribution.findById(id)
        .then(contributionsById => res.sendFile(path.resolve( __dirname + '/PDF_Files/'+ contributionsById.fichier)))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})

/**
 * Crée une contribution et met le fichier pdf dans contributions
 */
router.post('/',  (req, res) => {
    let payload = validateJWT(req?.headers?.authorization)
    if(payload.roles.includes("Auteur")){
        const contribution = new Contribution({
            auteur: payload.id,
            titre: req.body.titre,
            idConference: req.body.idConference,
            statut: req.body.statut,
            date_publication: new Date(),
            notes: req.body.notes
        });

        contribution.save().then(() => {
            res.status(StatusCodes.OK).json(contribution)
        }).catch(
            (error) => {
                res.status(StatusCodes.BAD_REQUEST).json({error: error});
            }
        )
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error: "UNAUTHORIZED"})
    }
});

/**
 * Upload du fichier de contribution
 */
router.put('/:id/upload', upload.single('fichierContribution') ,(req, res) => {
    let id = req.params.id
    let payload = validateJWT(req?.headers?.authorization)
    if(payload.roles.includes("Auteur")){
        Contribution.findByIdAndUpdate(id,{ 
            fichier : req.file.originalname
        }).then((contribution) => {
            res.status(StatusCodes.OK).json(contribution)
        }).catch((error)=>{
            res.status(StatusCodes.BAD_REQUEST).json({error : error})
        })
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error: "UNAUTHORIZED"})
    }
});

/**
 * Mise à jour du statut d'une contribution lors de la décision du MDC
 */
router.put('/:id',(req, res) => {
    let id = req.params.id
    let payload = validateJWT(req?.headers?.authorization)
    if(payload.roles.includes("Membre du comité")){
        Contribution.findByIdAndUpdate(id, req.body, {new : true})
            .then((contribution) => {
            res.status(StatusCodes.OK).json(contribution)
        }).catch((error)=>{
            res.status(StatusCodes.BAD_REQUEST).json({error : error})
        })
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error : "UNAUTHORIZED"})
    }
});

/**
 * Mise à jour des notes d'une contribution lors de la review d'un Reviewer
 */
router.put('/:id/notes', (req, res) => {
    let payload = validateJWT(req?.headers?.authorization)
    if (payload.roles.includes("Reviewer")) {
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
        res.status(StatusCodes.UNAUTHORIZED).json({error: "UNAUTHORIZED"})
    }
})

/**
 * Supprime une contribution
 */
router.delete('/:id',(req, res) => {
    let id = req.params.id
    let payload = validateJWT(req?.headers?.authorization)
    if(payload.roles.includes("Auteur")){
        Contribution.deleteOne({_id: id})
            .then((contribution) => {
                res.status(StatusCodes.OK).json({message: "Delete OK"})
            }).catch((error)=>{
            res.status(StatusCodes.BAD_REQUEST).json({error : error})
        })
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({error : "UNAUTHORIZED"})
    }
});

module.exports = router ;
