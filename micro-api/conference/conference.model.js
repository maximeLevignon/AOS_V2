const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

const conferenceSchema = mongoose.Schema({
  titre: { type: String, required: true, unique : true },
  domaine:{type:String},
  organisateur: { type: String, required: true },
  membre_comite_selection: { type: Object, required: true },
  contributions: {type : [String], required: false},
  date_contrib_fin:{type:String},
  date_event_debut:{type:String},
  date_event_fin:{type:String},
});

conferenceSchema.plugin(uniqueValidator, {message : "Titre de conférence déjà utilisé"})

module.exports = mongoose.model('Conference', conferenceSchema);
