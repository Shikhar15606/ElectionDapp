const steps = [
  {
    name: 'Registration Phase',
    description:
      'Eligible voters can register as voters on our webapp after completing the necessary verifications, Political parties & individual candidates can also reach out to the admin to register them for the upcoming elections',
    icon: '1',
  },
  {
    name: 'Voting Begins',
    description:
      'All the registered voters can anonymously vote during the voting day from 10:00 AM. The voting will be conducted on our webapp.',
    icon: '2',
  },
  {
    name: 'Voting Ends',
    description:
      "At 5:00 PM on the voting day, the voting phase will end. Any votes after 5:00 PM won't be counted.",
    icon: '3',
  },
  {
    name: 'Decalring Results',
    description:
      'Results will be declared within one hour, after voting ends. Overall & Constituency wise result will be declared',
    icon: '4',
  },
];

const TimeLine = () => {
  return (
    <div className='relative container mx-auto px-6 my-10 flex flex-col space-y-6 max-w-7xl'>
      <div className='lg:text-center'>
        <p className='my-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Election Process
        </p>
      </div>
      {steps.map((step, index) => {
        return (
          <div key={step.icon} className='relative z-10'>
            <div className='flex text-3xl bg-indigo-500 text-white timeline-img'>
              <h1 className='m-auto'>{step.icon}</h1>
            </div>
            <div
              className={`timeline-container ${
                index % 2 ? '' : 'timeline-container-left'
              }`}
            >
              <div
                className={`timeline-pointer ${
                  index % 2 ? '' : 'timeline-pointer-left'
                }`}
                aria-hidden='true'
              >
                {' '}
              </div>
              <div className='bg-indigo-100 p-6 rounded-md shadow-md'>
                <span className='font-bold text-indigo-600 text-sm tracking-wide'>
                  Aug 2020
                </span>
                <h1 className='text-2xl font-bold pt-1'>{step.name}</h1>
                <p className='pt-1'>{step.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeLine;
