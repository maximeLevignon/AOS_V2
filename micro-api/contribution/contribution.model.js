const mongoose = require('mongoose');

const contributionSchema = mongoose.Schema({
    auteur: { type: Object, required: true },
    titre: { type: String, required: true },
    conference: { type: Object, required: true },
    statut:{type: String, required: true},
    date_publication:{type: Date, required: true},
    nombre_review:{type: Number, required: true},
    total_review:{type: Number, required: true},
    moyenne_review:{type:Number, required: true},
    fichier:{type: String, required : true},
});

module.exports = mongoose.model('Contribution', contributionSchema);