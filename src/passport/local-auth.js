const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//usamos el ID para intercambiar entre paginas
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//se consulta el usuario en la base de datos
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email has been Taken.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    //se usa el metodo del modelo para encriptar
    //la contrase;a al momento de guardar
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
      //termina el proceso y envia los datos del usuario autenticado
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));
