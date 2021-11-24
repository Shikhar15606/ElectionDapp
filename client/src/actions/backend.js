import axios from 'axios';

axios.defaults.withCredentials = true;

const isAdmin = async () => {
  try {
    console.log('API', process.env.REACT_APP_API_URL);
    console.log('Blockchain', process.env.REACT_APP_BLOCKCHAIN_URL);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/isadmin`
    );
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
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email: email,
        password: password,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'Some Error Occured' };
  }
};

const logout = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'Some Error Occured' };
  }
};

const sendOTP = async voterID => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/regVoter/sendOTP`,
      {
        params: { voterID: voterID },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'Unable to Send OTP at the moment. Try again :)' };
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
      `${process.env.REACT_APP_API_URL}/api/regVoter/verifyOTP`,
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
    return { msg: 'Unable to Verify OTP at the moment. Try again :)' };
  }
};

const fetchStats = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/fetchStats`
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { msg: 'Some Error Occured' };
  }
};

export { isAdmin, login, logout, sendOTP, verifyOTP, fetchStats };
