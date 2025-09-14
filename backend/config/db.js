const mongoose = require('mongoose');

async function connect(uri){
  await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
  console.log('MongoDB conectado');
}

module.exports = { connect };
