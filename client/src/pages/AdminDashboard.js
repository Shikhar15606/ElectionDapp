import React, { useState } from 'react';
import { startVoting, declareResult } from '../actions/smartContract';
import AdminForms from '../components/AdminForms';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import LoadingComponent from '../components/Loading';

const AdminDashboard = props => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const startVoteHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const msg = await startVoting();
    setMessage(msg);
    setIsLoading(false);
  };
  const declareResultHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    const msg = await declareResult();
    setMessage(msg);
    setIsLoading(false);
  };

  const closeMessage = async e => {
    e.preventDefault();
    setMessage();
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className='bg-gray-50'>
      <div className='flex-grow p-3 max-w-7xl mx-auto shadow-2xl'>
        {message ? (
          <div className='bg-indigo-600 my-3 rounded-lg'>
            <div className='max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between flex-wrap'>
                <div className='w-0 flex-1 flex items-center'>
                  <span className='flex p-2 rounded-lg bg-indigo-800'>
                    <SpeakerphoneIcon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </span>
                  <p className='ml-3 font-medium text-white truncate'>
                    <span>{message}</span>
                  </p>
                </div>
                <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-3'>
                  <button
                    type='button'
                    className='-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'
                    onClick={closeMessage}
                  >
                    <button className='sr-only'>Dismiss</button>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <> </>
        )}
        <div className='rounded-md shadow'>
          <button
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
            onClick={startVoteHandler}
          >
            Start Voting Phase
          </button>
        </div>
        <div className='hidden sm:block' aria-hidden='true'>
          <div className='py-5'>
            <div className='border-t border-gray-200' />
          </div>
        </div>
        <div>
          <button
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
            onClick={declareResultHandler}
          >
            Declare Election Result
          </button>
        </div>
        <AdminForms
          contract={props.contract}
          message={message}
          setMessage={setMessage}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
