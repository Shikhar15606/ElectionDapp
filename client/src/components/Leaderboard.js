import Pagination from './Pagination';
import { useState, useEffect, useCallback } from 'react';
import {
  fetchPoliticalParties,
  fetchCandidatesResult,
} from '../actions/smartContract';

export default function Leaderboard(props) {
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 0 for candidate, 1 for party
  const [search, setSearch] = useState('');
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [individualSeats, setIndividualSeats] = useState();

  const fetchHandler = useCallback(async () => {
    const res = await fetchPoliticalParties(props.contract);
    // setting individual seats
    if (res.length > 0) setIndividualSeats(res.pop().seats);
    res.sort((a, b) => {
      return b.seats - a.seats;
    });
    setParties(res);
  }, [props.contract]);

  const fetchDistrictwiseResult = useCallback(async () => {
    const res = await fetchCandidatesResult(parseInt(search));
    res.sort((a, b) => {
      return b.votes - a.votes;
    });
    if (res.length === 0) {
      setError('No election conducted for this place');
    }
    setCandidates(res);
  }, [setCandidates, setError, search]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    if (parseInt(search) >= 100000 && parseInt(search) <= 999999) {
      fetchDistrictwiseResult();
    } else {
      setError('Invalid Pincode');
    }
  }, [search, setError, fetchDistrictwiseResult]);

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
                <select
                  className='mt-1 h-12 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  value={step}
                  onChange={e => {
                    setStep(e.target.value);
                  }}
                >
                  <option value={0}>Candidate</option>
                  <option value={1}>Party</option>
                </select>
              </div>
            </div>
          </div>
          {parseInt(step) === 0 && (
            <input
              className='w-40 md:w-56 px-2 h-12 rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2'
              type='number'
              placeholder='Enter Pincode'
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
          )}
        </div>
        {parseInt(step) === 0 ? (
          candidates.length > 0 ? (
            <>
              <Pagination
                data={candidates}
                title='Votes'
                pageLimit={5}
                dataLimit={10}
              />
            </>
          ) : (
            <h1 className='my-6 text-center text-xl font-semibold text-indigo-600'>
              {error ? error : 'Enter a valid Pincode to see result'}
            </h1>
          )
        ) : parties.length > 0 ? (
          <>
            <Pagination
              data={parties}
              title='Seats'
              pageLimit={5}
              dataLimit={10}
            />
            <h1 className='my-6 text-center text-xl font-semibold text-indigo-600'>
              {`and ${individualSeats} seat${
                individualSeats > 1 ? 's' : ''
              } won by individual candidates`}
            </h1>
          </>
        ) : (
          <>
            <h1 className='my-6 text-center text-xl font-semibold text-indigo-600'>
              No Political Parties to display
            </h1>
            <h1 className='my-6 text-center text-xl font-semibold text-indigo-600'>
              {`and ${individualSeats} seat${
                individualSeats > 1 ? 's' : ''
              } won by individual candidates`}
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
