const express = require('express');
const router = express.Router();
const passport = require('passport');
const Poll = require('../models/Poll');


router.get('/', async (req, res, next) => {
  const polls = await Poll.find();
  res.render("index", { polls: polls })
});

router.get('/new', isAuthenticated, (req, res, next) => {
    res.render("new")
});

router.post('/new', async (req, res, next) => {
  const data ={
    title: req.body.title,
    quest: req.body.quest,
    options: req.body.options,
    user: req.body.user
  };
  try {
    const newPoll = new Poll(data);
    await newPoll.save();
    req.flash('success', 'Encuesta creada');
    res.redirect("/");
  } catch (e) {
    res.redirect("/new");
    return next(e)
  }
});

router.get('/:id/show', async (req, res, next) => {
  const poll = await Poll.findById(req.params.id);
  res.render("results", { currentPoll: poll })
});

router.get('/vote/:id', async (req, res, next) => {
  try {
    const poll = await Poll.findById(req.params.id);
    res.render("vote", { currentPoll: poll })
  } catch (e) {
    next(e)
  }
});

router.post('/vote/:id', async(req, res, next) => {
  var poll = await Poll.findById(req.params.id);
  count = poll.options[req.body.options].count + 1
  poll.options[req.body.options].count = count
  await poll.save();

  res.redirect('/' + poll._id + '/show')
});

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    await Poll.findOneAndDelete({_id: req.params.id});
    res.redirect("/");
  } catch (e) {
    return next(e)
  }
});

router.get('/:id/delete', isAuthenticated, (req, res, next) => {
  try {
    req.flash('deleted', 'Encuesta eliminada');
    res.redirect("/");
  } catch (e) {
    return next(e)
  }
});


router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signin',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/logout', (req, res, next) =>{
  req.logout();
  res.redirect('/')
})

router.get('/profile', isAuthenticated, (req, res, next) =>{
  res.render("profile")
})

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}



module.exports = router
