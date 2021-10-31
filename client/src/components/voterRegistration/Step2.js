import { LockClosedIcon } from '@heroicons/react/solid';
import { verifyOTP } from '../../actions/backend';
import { useState } from 'react';
import MessageComponent from '../Message';
const Step2 = props => {
  const [err, setErr] = useState();

  const verifyOTPHandler = async e => {
    e.preventDefault();
    try {
      const res = await verifyOTP(props.phone, props.otp);
      console.log('indide Verify Handler => ' + props.district);
      // console.log(res);
      setErr(res.msg);
      // if (res.msg === 'OTP is approved') {
      //   setErr('OTP is approved')
      // }
      // else{

      // }
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };

  if (err) {
    return <MessageComponent msg={err} />;
  }
  return (
    <div>
      <div className='min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Register as Voter
            </h2>
            <p className='font-medium mt-2 text-center text-sm text-indigo-600'>
              Please enter the otp{' '}
            </p>
          </div>
          <form className='mt-8 space-y-9' action='#' method='GET'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm space-y-1'>
              <div>
                <label htmlFor='OTP' className='sr-only'>
                  OTP
                </label>
                <input
                  id='OTP'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter OTP'
                  value={props.otp}
                  onChange={e => {
                    props.setotp(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                // onClick={e => {
                // e.preventDefault();
                // console.log(props.otp);
                // }}
                onClick={verifyOTPHandler}
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                Verify & Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2;
