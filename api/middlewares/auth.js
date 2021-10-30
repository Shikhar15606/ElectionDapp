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

exports.fetchVoter = async (req, res, next) => {
  const voterID = req.query.voterID;

  Voters.findOne({ voterID: voterID }).exec(async (error, voterData) => {
    if (error) {
      // some error occured
      return res.status(400).json({ error });
    }
    if (voterData) {
      // VoterID is correct checking for password
      req.phone = voterData.phone;
      req.district = voterData.pinCode;
      req.hasRegistered = voterData.hasRegistered;
      next();
    } else {
      // no data found for given VoterID
      return res.status(401).json({
        msg: 'Invalid VoterID',
      });
    }
  });
};
