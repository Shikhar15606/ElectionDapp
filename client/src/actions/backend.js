import axios from 'axios';

axios.defaults.withCredentials = true;

const isAdmin = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/auth/isadmin`);
    console.log('Auth res: ', res);
    return res.data.isAdmin;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios.post('http://localhost:5000/auth/login', {
      email: email,
      password: password,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'Some Error Occured' };
  }
};

const logout = async () => {
  try {
    const res = await axios.get('http://localhost:5000/auth/logout');
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'Some Error Occured' };
  }
};

const sendOTP = async voterID => {
  try {
    const res = await axios.get('http://localhost:5000/api/regVoter/sendOTP', {
      params: { voterID: voterID },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'OTP not sent' };
  }
};

const verifyOTP = async (phone, code, voterID, VoterEthID, district) => {
  console.log('phone => ' + phone);
  console.log('code => ' + code);
  console.log('code => ' + voterID);
  console.log('code => ' + VoterEthID);
  console.log('code => ' + district);
  try {
    const res = await axios.post(
      'http://localhost:5000/api/regVoter/verifyOTP',
      {
        phone: phone,
        code: code,
        voterID: voterID,
        VoterEthID: VoterEthID,
        district: district,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'OTP not verified' };
  }
};

export { isAdmin, login, logout, sendOTP, verifyOTP };
