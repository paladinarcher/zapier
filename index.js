const aarcPollTrigger = require('./triggers/aarcPollTrigger.js');
const aarcWebhookTrigger = require('./triggers/aarcWebhookTrigger.js');

// We can roll up all our behaviors in an App.
const App = {
	// This is just shorthand to reference the installed dependencies you have. Zapier will
	// need to know these before we can upload
	version: require('./package.json').version,
	platformVersion: require('zapier-platform-core').version,

	// beforeRequest & afterResponse are optional hooks into the provided HTTP client
	beforeRequest: [
	],

	afterResponse: [
	],

	// If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
	resources: {
	},

	// If you want your trigger to show up, you better include it here!
	triggers: {
		[aarcPollTrigger.key]: aarcPollTrigger,
		[aarcWebhookTrigger.key]: aarcWebhookTrigger,
	},

	// If you want your searches to show up, you better include it here!
	searches: {
	},

	// If you want your creates to show up, you better include it here!
	creates: {
	}
};

// Finally, export the app.
module.exports = App;
