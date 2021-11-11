exports.createPoliticalParty = async (
  ElectionInstance,
  adminAccount,
  partyName,
  logoLink
) => {
  const result = await ElectionInstance.createPoliticalParty(
    partyName,
    logoLink,
    { from: adminAccount }
  );
  assert.equal(result.logs[0].args._name, partyName);
  // assert.equal(result.logs[0].args._logoLink, logoLink);
};

exports.createCandidate = async (
  ElectionInstance,
  adminAccount,
  candidateName,
  partyId,
  pinCode,
  logoLink
) => {
  const result = await ElectionInstance.addCandidate(
    candidateName,
    logoLink,
    partyId,
    pinCode,
    { from: adminAccount }
  );
  assert.equal(result.logs[0].args._name, candidateName);
  // assert.equal(result.logs[0].args._logoLink, logoLink);
  // assert.equal(result.logs[0].args._partyId, partyId);
  // assert.equal(result.logs[0].args._pinCode, pinCode);
};

exports.registerVoter = async (
  ElectionInstance,
  adminAccount,
  voterAccount,
  pinCode
) => {
  const result = await ElectionInstance.addVoter(voterAccount, pinCode, {
    from: adminAccount,
  });
  assert.equal(result.logs[0].args._id, voterAccount);
};

exports.startVoting = async (ElectionInstance, adminAccount) => {
  await ElectionInstance.startVoting({ from: adminAccount });
  const phase = await ElectionInstance.phase();
  assert.equal(phase, 2);
};

exports.vote = async (ElectionInstance, voterAccount, candidateId) => {
  const result = await ElectionInstance.vote(candidateId, {
    from: voterAccount,
  });
  assert.equal(result.logs[0].args._id, voterAccount);
};
