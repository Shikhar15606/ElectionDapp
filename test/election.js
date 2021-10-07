const Election = artifacts.require('./Election.sol');

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
    assert.equal(result.logs[0].args._pinCode, 486661);
  });

  it('Voting can be started', async () => {
    await ElectionInstance.startVoting({ from: accounts[0] });
    const phase = await ElectionInstance.phase();
    assert.equal(phase, 2);
  });

  it('Voting can be stopped', async () => {
    await ElectionInstance.startVoting({ from: accounts[0] });
    await ElectionInstance.stopVoting({ from: accounts[0] });
    const phase = await ElectionInstance.phase();
    assert.equal(phase, 4);
  });
});
