const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3040
//express app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log' , log + '\n', (err) => {
    if(err){
      console.log('kendall jenner');
    }
  });
  console.log(log); //prints the method used in the url and the path
  next();
})
//defines what view engine we using
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//handlers for route
// app.get('/', (req, res) =>{
//   res.send({
//     name: 'Bidemi',
//     likes: [
//       'Biking',
//       'Cities'
//     ]
//   });
// });
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});

app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage: 'Welcome to House'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    eMessage : 'Cannot reach website'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
