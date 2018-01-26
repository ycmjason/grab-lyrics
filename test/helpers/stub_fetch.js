const sinon = require('sinon');

const stub_response = (result) => ({
  text: sinon.stub().resolves(result),
  json: sinon.stub().resolves(result),
  blob: sinon.stub().resolves(result),
});

module.exports = {
  ok: (result) => sinon.stub().resolves(stub_response(result)),
  error: (error) => sinon.stub().rejects(error),
};
