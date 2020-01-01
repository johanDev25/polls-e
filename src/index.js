const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//INITIALIZATIONS
const app = express();
require('./database');
require('./passport/local-auth');

//CONFIGRUATIONS
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES(se ejecuta antes de las rutas)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
//se debe poner en este orden
//se configura la session
app.use(session({
  secret: 'mysecretjhsession',
  resave: false,
  saveUninitialized: false
}));
//enviar mensajes entre paginas
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  next();
});
//ROUTES
app.use('/', require('./routes/index'));

// STARTS THE SERVER
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})
