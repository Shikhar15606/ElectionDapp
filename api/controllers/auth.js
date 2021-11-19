const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const accessToken = jwt.sign(
    {
      data: req.adminID,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  console.log(process.env.FRONTEND_URL.split('/')[2]);
  res.cookie('accessToken', accessToken, {
    maxAge: 24 * 3600000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
    secure: process.env.NODE_ENV === 'production', // must be true if sameSite='none'
    httpOnly: true,
    signed: true,
  });
  res.status(200).json({
    msg: 'Login Success',
  });
};

exports.logout = (req, res) => {
  res.cookie('accessToken', '', {
    maxAge: 0,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
    secure: process.env.NODE_ENV === 'production', // must be true if sameSite='none'
    httpOnly: true,
    signed: true,
  });
  res.status(200).json({
    msg: 'Logout Success',
  });
};

exports.checkAuth = (req, res) => {
  const accessToken = req.signedCookies['accessToken'];
  if (accessToken) {
    try {
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      return res.status(200).json({
        isAdmin: true,
      });
    } catch (err) {
      return res.status(200).json({
        isAdmin: false,
      });
    }
  } else {
    return res.status(200).json({
      isAdmin: false,
    });
  }
};
