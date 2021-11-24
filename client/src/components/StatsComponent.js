import { useEffect, useState, useCallback } from 'react';
import { fetchStats } from '../actions/backend';

const StatsComponent = props => {
  const [error, setError] = useState();
  const [stats, setStats] = useState();

  const fetchStatsHandler = useCallback(async () => {
    try {
      const res = await fetchStats();
      if (res.msg) {
        setError(res.msg);
      } else {
        setStats(res);
      }
    } catch (err) {
      setError(err);
    }
  }, [setError, setStats]);

  useEffect(() => {
    fetchStatsHandler();
  }, [fetchStatsHandler]);

  if (error || !stats) {
    return <> </>;
  }
  return (
    <>
      <div className='lg:text-center px-6'>
        <p className='mt-14 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Stats
        </p>
      </div>
      <div className='flex-1 flex flex-row content-evenly flex-wrap'>
        <div className='w-96 mx-auto my-10 px-6 py-8 shadow-xl bg-indigo-50 rounded-md'>
          <h2 className='mt-6 text-center text-8xl font-extrabold text-indigo-600'>
            {stats.registeredUsers}
          </h2>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Voters's Registered
          </h2>
        </div>
        {stats.votesCasted > 0 ? (
          <div className='w-96 mx-auto my-10 px-6 py-8 shadow-xl bg-indigo-50 rounded-md'>
            <h2 className='mt-6 text-center text-8xl font-extrabold text-indigo-600'>
              {stats.votesCasted}
            </h2>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Votes Casted
            </h2>
          </div>
        ) : (
          <> </>
        )}
      </div>
    </>
  );
};

export default StatsComponent;
