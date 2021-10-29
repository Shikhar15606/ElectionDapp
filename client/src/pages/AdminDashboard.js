import React from 'react';
import { Link } from 'react-router-dom';
import AdminForms from '../components/AdminForms';

const AdminDashboard = () => {
  return (
    <>
      <div className='flex-grow p-3'>
        <div className='rounded-md shadow'>
          <Link
            to='/hello'
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
          >
            Start Voting Phase
          </Link>
        </div>
        <div className='hidden sm:block' aria-hidden='true'>
          <div className='py-5'>
            <div className='border-t border-gray-200' />
          </div>
        </div>
        <div>
          <Link
            to='/abc'
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
          >
            Declare Election Result
          </Link>
        </div>
      </div>

      <AdminForms />
    </>
  );
};

export default AdminDashboard;
