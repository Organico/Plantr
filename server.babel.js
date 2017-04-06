var express = require('express');

const app = express();
const Todo = require('./TodoSchema');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use('/', express.static('public'));

app.get('/api/todos', function(req, res, next) {
  Todo.find({}, (err, list) => {
    if (err) {
      return next(new Error(err));
    }
    res.send(list);
  })
});

app.post('/api/todos', (req, res, next) => {
  let todo = new Todo(req.body);
  todo.save({}, (err)=> {
    if (err) {
      return next(new Error(err));
    }
    res.status(200).send({"_id": todo._id, "task": req.body.task});
  });
});

app.delete('/api/todos/:id', function(req, res, next) {
  Todo.findOne({_id: req.params.id}).exec(function (err, item) {
    if (err || !item) {
      console.log('error finding record to delete', err);
      return next(new Error(err));
    }
    item.remove(function (err, success, next) {
      if (err) return next(err);
      console.log('deleted successfully', item);
      res.send('deleted successfully');
    });
  });
});

app.use(function(err, req, res, next){
  console.log('Something failed');
  res.status(500).send({"Error" : err.message})
});

app.listen(process.env.PORT || 3000);