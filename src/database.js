const mongoose = require('mongoose');
const { mongodb } = require('./keys')
mongoose.connect(process.env.MONGODB_URI || mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('Database is connected'))
  .catch(err => console.error(err))
