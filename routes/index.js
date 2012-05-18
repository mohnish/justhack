// GET index

exports.index = function(req, res){
  res.render('index', {title: 'JustHack', task: 'Complete JavaScript refactoring'});
};