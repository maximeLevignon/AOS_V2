const mongoose = require('mongoose');
const uriMongo = "mongodb+srv://adminTotoConf:xtnYgNHYYBTiTAiy@cluster0.svras.mongodb.net/BDDTEST?retryWrites=true&w=majority";


let database = mongoose.connect(uriMongo,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(error => console.error(error));

module.exports = database;
