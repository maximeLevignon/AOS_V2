let express = require('express')
let router = express.Router()
let Contribution = require('./contribution.model')
let StatusCodes = require('http-status-codes').StatusCodes
/*
**Retourne les contributions
*/
router.get('/', (req, res) =>{
    Contribution.find({}, {})
        .then(contributionById => res.status(StatusCodes.OK).json(contributionById))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }))
})
/**
 * Crée une contribution et met le fichier pdf dans contributions
 */
router.post('/', (req, res) => {
    console.log(req.body)
    console.log(req.files)
    //let fichierRecu = req.files.fichierContribution
    //let fichierRecu = req.body.fichier;
    //console.log(fichierRecu);
    /*fichierRecu.mv(__dirname + '/../PDF_Files/' + fichierRecu.name, function(err) {
        const contribution = new Contribution({
            auteur: "req.body.titre," ,//recuperer jwt
            titre: req.body.titre,
            conference: req.body.conference,
            statut: req.body.statut,
            date_publication: new Date(),
            nombre_review: 0,
            score_review: 0,
            fichier: "PDF_Files/" + fichierRecu
        });

        contribution.save().then(() =>{
            alert("contribution déposé avec succès");
        }
    })*/
});

/**
 * Note une contribution 
 * 61d5a28605b3b55cc45e53c2
 */
router.put('/:id', (req, res) =>{
    let id = req.params.id
    let scoreSoumis = 10 ;
    Contribution.find({_id : id})

    .then(contribution => {
        console.log(contribution[0])
        console.log(contribution[0].nombre_review)
        console.log(contribution[0].total_review)
        let nombre_reviewMisAJour = contribution[0].nombre_review + 1
        let total_reviewMisAJour = contribution[0].total_review + scoreSoumis
        let moyenne_reviewMisAJour = total_reviewMisAJour / nombre_reviewMisAJour

        console.log(nombre_reviewMisAJour)
        console.log(total_reviewMisAJour)
        console.log(moyenne_reviewMisAJour)
    })
    

    res.status(200).json("OK")
})
module.exports = router ;