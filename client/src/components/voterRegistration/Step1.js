import { LockClosedIcon } from '@heroicons/react/solid';
import { sendOTP } from '../../actions/backend';
import { useState } from 'react';
import MessageComponent from '../Message';
import LoadingComponent from '../Loading';

const Step1 = props => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendOTPHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await sendOTP(props.voterId);
      console.log(res);
      if (res.msg === 'OTP is sent!') {
        setIsLoading(false);
        props.onSendOTP(res.phonenumber);
      } else {
        setMessage(res.msg);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setMessage('Some Error Occured');
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (message) {
    return <MessageComponent msg={message} />;
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
              Please enter the details{' '}
            </p>
          </div>
          <form className='mt-8 space-y-9'>
            <div className='rounded-md shadow-sm space-y-1'>
              <div>
                <label htmlFor='voterId' className='sr-only'>
                  Voter Id
                </label>
                <input
                  id='voterId'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Voter Id'
                  value={props.voterId}
                  onChange={e => {
                    props.setVoterId(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor='EthereumId' className='sr-only'>
                  Ethereum Id
                </label>
                <input
                  id='EthereumId'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Enter Your Ethereum Id'
                  value={props.ethereumId}
                  onChange={e => {
                    props.setEthereumId(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={sendOTPHandler}
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1;
