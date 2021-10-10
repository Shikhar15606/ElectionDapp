import {
  LightningBoltIcon,
  ShieldCheckIcon,
  UserIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
const features = [
  {
    name: 'Secure & Fair',
    description:
      "Every vote is a transaction, which is secured by cryptography. Each transaction is signed with a private key and then can be further verified with a public key. If transaction data changes, the signature becomes invalid. As a result, the block is ignored and won't make it to the chain.",
    icon: ShieldCheckIcon,
  },
  {
    name: 'Decentralized',
    description:
      'In a decentralized blockchain network, no one has to know or trust anyone else. Each member in the network has a copy of the exact same data in the form of a distributed ledger. If a member’s ledger is altered or corrupted in any way, it will be rejected by the majority of the members in the network.',
    icon: ViewGridIcon,
  },
  {
    name: 'Your vote is private',
    description:
      'In our webapp voting is done with your ethereum account and there is no link between your wallet address and your identity, your vote stays anonymous. You can also verify that your vote has been recorded with your transaction Id',
    icon: UserIcon,
  },
  {
    name: 'Fast & Simple',
    description:
      'Since we conduct online elections, the result can be declared quickly. Voting & Registration is also very simple and you can vote for your favourite candidate from anywhere in just a few clicks.',
    icon: LightningBoltIcon,
  },
];

const Features = () => {
  return (
    <div className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Salient Features
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
            {features.map(feature => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
