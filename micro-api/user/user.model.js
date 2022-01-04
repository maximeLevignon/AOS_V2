const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  login: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  roles:{type: [String], required: true}
});

userSchema.plugin(uniqueValidator, {message : "Login déjà utilisé"})

module.exports = mongoose.model('Users', userSchema);
