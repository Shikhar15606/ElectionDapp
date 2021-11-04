/* This example requires Tailwind CSS v2.0+ */
import { ChevronDownIcon } from '@heroicons/react/solid';
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  getCandidates,
  fetchPoliticalParties2,
} from '../actions/smartContract';

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
  const [search, setSearch] = useState();
  const [parties, setParties] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetchPoliticalParties2();
      console.log('dekh le bhai --------------', res);
      setParties(res);
    }, 4000);
  }, []);

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
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700'
                >
                  Registered Political Party
                </label>
                <select
                  id='country'
                  name='country'
                  autoComplete='country-name'
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  value={step}
                  onChange={e => {
                    console.log(e.target.value);
                    setStep(e.target.value);
                  }}
                >
                  <option value={0}>Candidate</option>
                  <option value={1}>Party</option>
                </select>
              </div>
            </div>
          </div>
          <input
            className='w-40 md:w-56 px-2 h-12 rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2'
            type='number'
            placeholder='Search'
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {data.length > 0 ? (
          <>
            <Pagination
              data={parties}
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
