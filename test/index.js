const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('Paladin and Archer Zapier Example', () => {

  it('creates should hello', (done) => {
    const bundle = {};
	console.log(App);

    appTester(App.creates.aarcCreates.operation.perform, bundle)
      .then(results => {
		console.log("start of creates");
        should(results.length).above(0);

        const firstResult = results[0];
        console.log('test result: ', firstResult)
        should(results[0].message).eql('Success');

        done();
      })
      .catch(done);
  });

  it('should get hello', (done) => {
    const bundle = {};

    appTester(App.triggers.aarc.operation.perform, bundle)
      .then(results => {
        should(results.length).above(0);

        const firstResult = results[0];
        console.log('test result: ', firstResult)
        should(results[0].message).eql('Success');

        done();
      })
      .catch(done);
  });



});
