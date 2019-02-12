const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('Testing the Paladin and Archer Zapier Example', () => {
//it.only to use just one it
	it('Creates should succeed', (done) => {
		const bundle = {};

		appTester(App.creates.aarcCreates.operation.perform, bundle)
			.then(result => {
				const parsed = JSON.parse(result.json);
				should(parsed.name).eql('name');

				done();
			})
			.catch(done);
	});

	it('Polling trigger should succeed', (done) => {
		const bundle = {};

		appTester(App.triggers.aarc_poll_trigger.operation.perform, bundle)
			.then(results => {
				// results from API
				should(results.length).above(0);

				const result = results[0];
				should(result.message).eql('Success');

				done();
			})
			.catch(done);
	});

	it('Webhook trigger performSubscribe should succeed', (done) => {
		const bundle = {
			targetUrl: "https://hooks.zapier.com/1234/abcd", // Fake URL (verfied below)

			// None of the following data is used
			inputData: {
				style: 'mediterranean'
			},
			cleanedRequest: {
				id: 1,
				name: 'name 1',
				directions: 'directions 1'
			}
		};

		appTester(App.triggers.aarc_webhook.operation.performSubscribe, bundle)
			.then(result => {
				should(result.message).eql('Success');
				should(result.url).eql(bundle.targetUrl);

				done();
			})
			.catch(done);
	});

	it('Webhook trigger performList should succeed', (done) => {
		// Data not used
		const bundle = {
			inputData: {
				style: 'mediterranean'
			},
			meta: {
				frontend: true
			}
		};

		appTester(App.triggers.aarc_webhook.operation.performList, bundle)
			.then(results => {
				should(results.length).above(0);

				const result = results[0];
				should(result.message).eql('Success');

				done();
			})
			.catch(done);
	});

});
