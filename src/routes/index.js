const express = require('express');
const router = express.Router();

const { getPolls, getForm, createPoll, getResults, votePoll, createVote, deletePoll, getMessage } = require('../controllers/pollController');
const { getSignup, createUser, getSignin, loginUser, logout } = require('../controllers/userController');

router.route('/')
      .get(getPolls)

router.route('/new')
      .get(getForm)
      .post(createPoll)

router.route('/:id/show')
      .get(getResults)

router.route('/vote/:id')
      .get(votePoll)
      .post(createVote)

router.route('/:id')
      .delete(deletePoll)

router.route('/:id/delete')
      .get(getMessage)

//AUTENTICATE-ROUTES

router.route('/signup')
      .get(getSignup)
      .post(createUser)

router.route('/signin')
      .get(getSignin)
      .post(loginUser)

router.route('/logout')
      .get(logout)


module.exports = router
