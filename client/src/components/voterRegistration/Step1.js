import { LockClosedIcon } from '@heroicons/react/solid';
const Step1 = props => {
  return (
    <div>
      <form className='space-y-2'>
        <div className='rounded-md shadow-sm space-y-1'>
          <div>
            <label htmlFor='voterId' className='sr-only'>
              Voter Id
            </label>
            <input
              id='voterId'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Voter Id'
              value={props.voterId}
              onChange={e => {
                props.setVoterId(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={e => {
              e.preventDefault();
              console.log(props.voterId);
            }}
          >
            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
              <LockClosedIcon
                className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                aria-hidden='true'
              />
            </span>
            Verify VoterId
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
