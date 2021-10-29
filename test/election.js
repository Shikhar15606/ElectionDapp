const Election = artifacts.require('./Election.sol');
const time = require('./helpers/time');
const utils = require('./helpers/utils');
const {
  createPoliticalParty,
  createCandidate,
  registerVoter,
  startVoting,
  vote,
} = require('./helpers/tests');
contract('Election', accounts => {
  let ElectionInstance;

  beforeEach(async () => {
    ElectionInstance = await Election.new(accounts[0]);
  });

  // ============================== Unit Tests ========================================
  it('Create Political Party', () => {
    createPoliticalParty(
      ElectionInstance,
      accounts[0],
      'Bharatiya Janata Party',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
  });

  it('Register Individual Candidate', () => {
    createCandidate(
      ElectionInstance,
      accounts[0],
      'Alice',
      -1,
      486661,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
  });

  it('Register Voter', () => {
    registerVoter(ElectionInstance, accounts[0], accounts[1], 486661);
  });

  it('Start Voting Phase', () => {
    startVoting(ElectionInstance, accounts[0]);
  });

  // =============================== Integration Tests ================================
  it('Register Candidate From a Political Party', async () => {
    // create party
    await createPoliticalParty(
      ElectionInstance,
      accounts[0],
      'Bharatiya Janata Party',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
    // create candidate
    await createCandidate(
      ElectionInstance,
      accounts[0],
      'Narendra Modi',
      0,
      486661,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
  });

  it('Vote can be casted during voting period & not after the voting period', async () => {
    // create party
    await createPoliticalParty(
      ElectionInstance,
      accounts[0],
      'Bharatiya Janata Party',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
    // create candidate
    await createCandidate(
      ElectionInstance,
      accounts[0],
      'Narendra Modi',
      0,
      486661,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
    // register 2 voters
    await registerVoter(ElectionInstance, accounts[0], accounts[1], 486661);
    await registerVoter(ElectionInstance, accounts[0], accounts[2], 486661);
    // Start Voting
    await startVoting(ElectionInstance, accounts[0]);
    // Since voting phase is going on the voter can cast vote.
    await vote(ElectionInstance, accounts[1], 0);
    // lets time travel by 1 days.
    await time.advanceTimeAndBlock(1 * 24 * 60 * 60);
    // It is expected to throw Error here because the voting period is over and a voter is trying to cast vote.
    await utils.shouldThrow(ElectionInstance.vote(0, { from: accounts[2] }));
  });
});
