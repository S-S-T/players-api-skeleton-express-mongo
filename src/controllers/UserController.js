/* SST */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create user
router.post('/', function(req, res) {

  if (req.body.password !== req.body.confirm_password) {
    return res.status(409).send('The passwords do not match');
  }

// Encrypt/Decrypt pwd before push to MongoDB
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: hashedPassword},
    function(err, user) {
      if (err) return res.status(409).send('There was a problem adding a new user');
<<<<<<< HEAD
      // const token1 = jwt.sign(doc.toObject(), jwtSecret);// SST additive...
=======

>>>>>>> 63dda4abcdc26ff2ed08bacb187fd730929d7281
      const token = jwt.sign({
        id: user._id
      }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hrs
      });
      res.status(201).send({
        success: true,
        user,
        token: token
      });
    });
});

router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(401).send('No user found.');
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({
      success: true,
      user,
      token: token
    });
  });
});


// Update single user in Datbase
router.put('/:userId', function(req, res) {
  User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true},
    function(err, user) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send({'success': true, user});
    });
});

module.exports = router;
