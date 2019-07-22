const app = require('express')();



app.get('/', (req, res) => {
  res.send({msg: 'hello! Server is up and running'});
});

app.use('/', require('./frontend'));




// the catch all route
// app.all('*', (req, res) => {
//   res.status(404).send({msg: 'not found'});
// });


module.exports = {
  routes:app
}
