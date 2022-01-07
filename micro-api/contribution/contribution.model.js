const mongoose = require('mongoose');

const contributionSchema = mongoose.Schema({
    auteur: { type: Object, required: true },
    titre: { type: String, required: true },
    idConference: { type: String, required: true },
    statut:{type: Boolean, required: true},
    date_publication:{type: Date, required: true},
    notes: {type :[Number], required: true},
    fichier:{type: String, required : false},
});

module.exports = mongoose.model('Contribution', contributionSchema);
