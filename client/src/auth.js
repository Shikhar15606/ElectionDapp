import React from 'react';
import Loading from './components/Loading';
export default function Auth(
  ComposedClass,
  isLogin,
  setisLogin,
  status,
  contract
) {
  function AuthenticationCheck(props) {
    if (isLogin === true && status === false) {
      props.history.push('/admin');
    }
    if (isLogin === false && status === true) {
      props.history.push('/login');
    }

    let obj = { isLogin, setisLogin, contract };
    if (isLogin === 'Loading') {
      return <Loading />;
    } else {
      return <ComposedClass {...obj} />;
    }
  }
  return AuthenticationCheck;
}
