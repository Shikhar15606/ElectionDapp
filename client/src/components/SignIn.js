import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { login } from '../actions/backend';
import MessageComponent from './Message';
export default function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();
  const signInHandler = async e => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.msg === 'Login Success') {
      props.setisLogin(true);
    } else {
      setErr(res.msg);
    }
  };

  if (err) {
    return <MessageComponent msg={err} />;
  }
  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Login
          </h2>
          <p className='font-medium mt-2 text-center text-sm text-indigo-600'>
            Please Provide Admin Credentials{' '}
          </p>
        </div>
        <form className='mt-8 space-y-9'>
          <div className='rounded-md shadow-sm space-y-1'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email Id'
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={signInHandler}
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LockClosedIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
