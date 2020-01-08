const usersCrtl = {};

const passport = require('passport');

usersCrtl.getSignup = (req,res, next)=> {
  res.render('signup');
}

usersCrtl.createUser = passport.authenticate('local-signup', {
  successRedirect: '/signin',
  failureRedirect: '/signup',
  failureFlash: true
})

usersCrtl.getSignin = (req,res, next)=> {
  res.render('signin');
}

usersCrtl.loginUser = passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
})

usersCrtl.logout = (req,res, next)=> {
  req.logout();
  res.redirect('/')
}

module.exports = usersCrtl;
