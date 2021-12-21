const Admin = require('../models/admin');
const Voters = require('../models/voters');
const bcrypt = require('bcrypt');

exports.checkCredentials = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email: email }).exec(async (error, adminData) => {
    if (error) {
      // some error occured
      return res.status(400).json({ error });
    }
    if (adminData) {
      // email is correct checking for password
      const match = await bcrypt.compare(password, adminData.password);
      if (match) {
        req.adminID = adminData._id;
        next();
      } else {
        return res.status(200).json({
          msg: 'Invalid email/password combination',
        });
      }
    } else {
      // no data found for given email
      return res.status(200).json({
        msg: 'Invalid email/password combination',
      });
    }
  });
};

exports.verifyVoter = async (req, res, next) => {
  let query;
  if (req.query.voterID) {
    query = {
      voterID: req.query.voterID,
    };
  } else {
    query = {
      phone: req.body.phone,
    };
  }
  console.log(query);
  Voters.findOne(query).exec(async (error, voterData) => {
    if (error) {
      // some error occured
      return res.status(400).json({ error });
    }
    if (voterData) {
      // Voter found
      if (voterData.hasRegistered === true) {
        return res.status(200).json({
          msg: 'Voter already registered',
        });
      } else {
        req.phone = voterData.phone;
        req.district = voterData.pinCode;
        req._id = voterData._id;
        next();
      }
    } else {
      // no data found for given Voter
      return res.status(200).json({
        msg: 'Invalid VoterID',
      });
    }
  });
};
