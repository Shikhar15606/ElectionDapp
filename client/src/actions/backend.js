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
export { isAdmin, login };
