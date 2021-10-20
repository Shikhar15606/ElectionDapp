const Admin = require('../models/admin');
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
        return res.status(401).json({
          message: 'Invalid email/password combination',
        });
      }
    } else {
      // no data found for given email
      return res.status(401).json({
        message: 'Invalid email/password combination',
      });
    }
  });
};
