import React, { useEffect } from 'react';
import Loading from './components/Loading';
export default function Auth(
  ComposedClass,
  isLogin,
  setisLogin,
  status,
  contract
) {
  function AuthenticationCheck(props) {
    useEffect(() => {
      if (isLogin === true && status === false) {
        props.history.push('/admin');
      }
      if (isLogin === false && status === true) {
        props.history.push('/login');
      }
    }, [isLogin]);
    if (!contract) {
      console.log('Contract Initialized in Auth');
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
