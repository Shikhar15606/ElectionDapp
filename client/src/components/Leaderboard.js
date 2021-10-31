/* This example requires Tailwind CSS v2.0+ */
import { ChevronDownIcon } from '@heroicons/react/solid';
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Leaderboard() {
  const [data, setData] = useState([
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]);
  const [error, setError] = useState('');
  const [isPartyData, setIsPartyData] = useState('true');
  const [step, setStep] = useState(0); // 0 for candidate, 1 for party

  const getInitialState = () => {
    return { selectValue: 'Radish' };
  };
  const handleChange = e => {
    setIsPartyData(e.target.value);
  };

  return (
    <div class='p-2 md:p-8'>
      <div className='mx-auto max-w-5xl mt-4'>
        <h2 className='my-6 text-center text-3xl font-extrabold text-gray-900'>
          Results Declared
        </h2>
        <div className='flex flex-row flex-nowrap items-center justify-between mx-auto'>
          <div className='flex-initial'>
            <div className='flex items-center'>
              <Menu as='div' className='relative inline-block text-left'>
                <Menu.Button className='flex flex-row w-32 md:w-48 px-2 h-12 items-center justify-between rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2'>
                  Candidate
                  <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 w-32 md:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-2 py-2 text-sm'
                            )}
                          >
                            Party
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-2 py-2 text-sm'
                            )}
                          >
                            Candidate
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <input
            className='w-40 md:w-56 px-2 h-12 rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2'
            type='text'
            placeholder='Search'
          />
        </div>

        {data.length > 0 ? (
          <>
            <Pagination
              data={data}
              title='Candidate'
              StatisticsType='Votes'
              StatisticsNumber='200'
              pageLimit={5}
              dataLimit={10}
            />
          </>
        ) : (
          <h1>No data to display</h1>
        )}
      </div>
    </div>
  );
}
