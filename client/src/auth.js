import React, { useEffect, useState } from 'react';
import { isAdmin } from './actions/backend';
import Loading from './components/Loading';
export default function Auth(ComposedClass, status) {
  const [isLoggedIn, setIsLoggedIn] = useState('Loading');
  const check = async () => {
    try {
      const res = await isAdmin();
      console.log('Check FXn', res);
      setIsLoggedIn(res);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    }
  };
  function AuthenticationCheck(props) {
    useEffect(() => {
      check();
      if (isLoggedIn === true && status === false) {
        props.history.push('/admin');
      }
      if (isLoggedIn === false && status === true) {
        props.history.push('/login');
      }
    }, [isLoggedIn]);
    if (isLoggedIn === 'Loading') {
      return <Loading />;
    } else {
      return <ComposedClass {...props} />;
    }
  }
  return AuthenticationCheck;
}
