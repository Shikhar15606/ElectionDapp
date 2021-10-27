const Election = artifacts.require('./Election.sol');
const time = require('./helpers/time');
const utils = require('./helpers/utils');

contract('Election', accounts => {
  let ElectionInstance;
  beforeEach(async () => {
    ElectionInstance = await Election.new(accounts[0]);
  });

  it('Create Political Party', async () => {
    const result = await ElectionInstance.createPoliticalParty(
      'Bharatiya Janata Party',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg',
      { from: accounts[0] }
    );
    assert.equal(result.logs[0].args._name, 'Bharatiya Janata Party');
    assert.equal(
      result.logs[0].args._logoLink,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
  });

  it('Register Individual Candidate', async () => {
    const result = await ElectionInstance.addCandidate(
      'Alice',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg',
      -1,
      486661,
      { from: accounts[0] }
    );
    assert.equal(result.logs[0].args._name, 'Alice');
    assert.equal(
      result.logs[0].args._logoLink,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
    assert.equal(result.logs[0].args._partyId, -1);
    assert.equal(result.logs[0].args._pinCode, 486661);
  });

  it('Register Candidate From a Political Party', async () => {
    // create party
    const result = await ElectionInstance.createPoliticalParty(
      'Bharatiya Janata Party',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg',
      { from: accounts[0] }
    );
    assert.equal(result.logs[0].args._name, 'Bharatiya Janata Party');
    assert.equal(
      result.logs[0].args._logoLink,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
    // create candidate
    const result1 = await ElectionInstance.addCandidate(
      'Narendra Modi',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg',
      0,
      486661,
      { from: accounts[0] }
    );
    assert.equal(result1.logs[0].args._name, 'Narendra Modi');
    assert.equal(
      result1.logs[0].args._logoLink,
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg'
    );
    assert.equal(result1.logs[0].args._partyId, 0);
    assert.equal(result1.logs[0].args._pinCode, 486661);
  });

  it('Add Voter', async () => {
    const result = await ElectionInstance.addVoter(accounts[1], 486661, {
      from: accounts[0],
    });
    assert.equal(result.logs[0].args._id, accounts[1]);
  });

  it('Voting can be started', async () => {
    await ElectionInstance.startVoting({ from: accounts[0] });
    const phase = await ElectionInstance.phase();
    // console.log(ElectionInstance);
    assert.equal(phase, 2);
  });

  it('Vote can not be casted after the voting Period', async () => {
    // create party
    await ElectionInstance.createPoliticalParty(
      'Bharatiya Janata Party',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg',
      { from: accounts[0] }
    );

    // create  candidate
    await ElectionInstance.addCandidate(
      'Narendra Modi',
      'https://themayanagari.com/wp-content/uploads/2021/03/Bharatiya-Janata-Party-Png.jpg',
      0,
      486661,
      { from: accounts[0] }
    );

    await ElectionInstance.addVoter(accounts[1], 486661, {
      from: accounts[0],
    });

    await ElectionInstance.addVoter(accounts[2], 486661, {
      from: accounts[0],
    });

    await ElectionInstance.startVoting({ from: accounts[0] });

    // Since voting phase is going on the voter can cast vote.
    await ElectionInstance.vote(0, { from: accounts[1] });

    // lets time travel by 1 days.
    await time.advanceTimeAndBlock(1 * 24 * 60 * 60);

    // It is expected to throw Error here because the voting period is over and a voter is trying
    // to cast vote.
    await utils.shouldThrow(ElectionInstance.vote(0, { from: accounts[2] }));
  });
});
