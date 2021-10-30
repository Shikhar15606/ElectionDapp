import React, { useEffect, useState } from 'react';
import { isAdmin } from './actions/backend';
import Loading from './components/Loading';
export default function Auth(ComposedClass, isLogin, setisLogin, status) {
  function AuthenticationCheck(props) {
    useEffect(() => {
      if (isLogin === true && status === false) {
        props.history.push('/admin');
      }
      if (isLogin === false && status === true) {
        props.history.push('/login');
      }
    }, [isLogin]);
    const obj = { isLogin, setisLogin };
    if (isLogin === 'Loading') {
      return <Loading />;
    } else {
      return <ComposedClass {...obj} />;
    }
  }
  return AuthenticationCheck;
}
