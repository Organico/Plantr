const express = require('express');
const router = express.Router();
const Forum = require('../../../db/models/Forum')

/*--------------------GET REQUEST---------------------------------------------*/

router.get('/', function(req, res, next) {
  let email = req.query
  Forum.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting the forum info: ', err);
      res.status(404);
    } else {
      console.log('Successful get request for forum info');
      res.status(200).send(data);
    }
  })
});

router.get('/:email', function(req, res, next) {
  Forum.find({}, (err, data) => {
    if (err) {
      console.error('There was an error getting the specific forum info: ', err);
      res.status(404);
    } else {
      console.log('Successful get request for specific forum info');
      res.status(200).send(data);
    }
  })
});

/*--------------------POST REQUEST---------------------------------------------*/

router.post('/', (req, res, next) => {
  let forum = new Forum({
    profile: req.body.profile,
    title: req.body.title,
    message: req.body.message,
    nickname: req.body.nickname,
    email: req.body.email,
    replies: req.body.replies,
    time: req.body.time
  });
  forum.save({}, (err, data) => {
    if (err) {
      console.error('There was an error saving the forum info onto the server: ', err);
      res.status(500);
    } else {
      console.log('Successfully posting plant info on the server');
      res.status(200).send(data);
    }
  });
});

/*--------------------PUT REQUEST-----------------------------------------*/

// posting replies on the server
router.put('/', (req, res, next) => {
  Forum.findById(req.body.id, (err, result) => {
    if (err) {
      console.error('There has been a serverside error posting the replies: ', err);
      res.status(500);
    } else {
      result.replies.push(req.body.replies);
      result.save((err) => {
        if (err) {
          console.error('There has been a serverside error saving the posted replies: ', err);
          res.status(500);
        } else {
          console.log('Successfully posting a reply on the server');
          res.status(200).send(result);
        }
      });
    }
  });
});

// updating posts on the server
router.put('/:id', (req, res, next) => {
  Forum.findById(req.body.id, (err, result) => {
    if (err) {
      console.error('There has been a serverside error updating the posts: ', err);
      res.status(500);
    } else {
      result.message = req.body.message;
      result.title = req.body.title;
      result.save((err) => {
        if (err) {
          console.error('There has been a serverside error saving the updated posts: ', err);
          res.status(500);
        } else {
          console.log('Successfully updated a post on the server');
          res.status(200).send(result);
        }
      });
    }
  });
});

// updating replies on the server
router.put('/:id/:replyId', (req, res, next) => {
  let modifiedId;
  Forum.findById(req.params.id, (err, result) => {
    if (err) {
      console.error('There has been a serverside error updating the replies: ', err);
      res.status(500);
    } else {
      result.replies.forEach((key, i) => {
        if (key.message === req.body.params.oldMessage) {
          modifiedId = i;
        }
      });
      let newMessage = result.replies[modifiedId];
      newMessage['message'] = req.body.params.message;
      result.replies.splice(modifiedId, 1, newMessage)
      result.save(function(err) {
        if (err) {
          console.error('There was an error saving your reply on the server: ', err);
          res.status(500);
        } else {
          console.log('Successfully saved a reply on the server');
          res.status(200).send(result);
        }
      });
    }
  });
});

/*--------------------DELETE REQUEST-----------------------------------------*/

// deleting posts made by users
router.delete('/:id', (req, res, next) => {
  Forum.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      console.error('There was an error deleting your post: ', err);
      res.status(500);
    } else {
      console.log('Successfully deleted a post on the server');
      res.status(200).send(result);
    }
  });
});

// deleting replies made by users
router.delete('/:id/:replyId', (req, res, next) => {
  let deleteId;
  Forum.findById(req.params.id, (err, result) => {
    if (err) {
      console.error('There has been a serverside error deleting the replies: ', err);
      res.status(500);
    } else {
      result.replies.forEach( (key, i) => {
        if (key['replyUser']['clientID'] === req.params.replyId) {
          deleteId = i;
        }
      });
      result.replies.splice(deleteId, 1);
      result.save((err) => {
        if (err) {
          console.error('There was an error deleting your reply from the server: ', err);
          res.status(500);
        } else {
          console.log('Successfully deleted a reply from the server');
          res.status(200).send(result);
        }
      });
    }
  });
});

module.exports = router;
