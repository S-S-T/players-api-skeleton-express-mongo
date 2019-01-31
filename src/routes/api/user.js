<<<<<<< HEAD
/* SST */
const Boom = require('boom');
const { jwtsecret } = require('config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  const { password, confirm_password } = req.body;
  if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send({
        success: true,
        token: getToken(user),
        user
      });
    }).catch(next);
});

const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;
=======
/* SST */
const Boom = require('boom');
const { jwtsecret } = require('config');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../../models');

const router = new Router();

router.post('/', (req, res, next) => {
  const { password, confirm_password } = req.body;
  if (!password || !confirm_password || password !== confirm_password) throw Boom.conflict('Passwords do not match');
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send({
        success: true,
        token: getToken(user),
        user
      });
    }).catch(next);
});

const getToken = user => jwt.sign({ userId: user._id }, jwtsecret);

module.exports = router;
>>>>>>> 63dda4abcdc26ff2ed08bacb187fd730929d7281
