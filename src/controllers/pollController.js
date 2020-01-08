const pollsCrtl = {};

const Poll = require('../models/Poll');

pollsCrtl.getPolls = async (req,res, next)=> {
  const polls = await Poll.find();
  res.render("index", { polls: polls })
}


pollsCrtl.getForm = (req,res, next)=> {
  if(req.isAuthenticated()) {
    res.render("new")
  }else{
    res.redirect("/");
  }
}

pollsCrtl.createPoll = async (req,res, next)=> {
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
}

pollsCrtl.getResults= async (req,res, next)=> {
  const poll = await Poll.findById(req.params.id);
  res.render("results", { currentPoll: poll })
}

pollsCrtl.votePoll= async (req,res, next)=> {
  try {
    const poll = await Poll.findById(req.params.id);
    res.render("vote", { currentPoll: poll })
  } catch (e) {
    next(e)
  }
}

pollsCrtl.createVote = async (req,res, next)=> {
  var poll = await Poll.findById(req.params.id);
  count = poll.options[req.body.options].count + 1
  poll.options[req.body.options].count = count
  await poll.save();

  res.redirect('/' + poll._id + '/show')
}

pollsCrtl.deletePoll = async (req,res, next)=> {
  try {
    await Poll.findOneAndDelete({_id: req.params.id});
    res.redirect("/");
  } catch (e) {
    return next(e)
  }
}

pollsCrtl.getMessage = async (req,res, next)=> {
    req.flash('deleted', 'Encuesta eliminada');
    res.redirect("/");
}



module.exports = pollsCrtl;
