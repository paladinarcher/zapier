const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('Testing the Paladin and Archer Zapier Example', () => {


	it('should get hello', (done) => {
		const bundle = {};

		appTester(App.triggers.aarc_status_polling.operation.perform, bundle)
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
