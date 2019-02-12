const subscribeHook = (z, bundle) => {
	z.console.log('Zapier application subscribeHook function entry');
	
	// bundle.targetUrl has the Hook URL AARC should call when the event is fired.
	const data = {
		url: bundle.targetUrl,
		style: bundle.inputData.style // Just more data; not used here
	};
	
	// You can build requests and our client will helpfully inject all the variables
	// you need to complete.
	// See: https://github.com/zapier/zapier-platform-cli#http-request-options
	const httpOptions = {
		headers: {
			'my-header': 'some value',
		},
		method: 'POST',
		json: JSON.stringify(data) // Don't use the "body" property here
	};
	
	// You may return a promise or a normal data structure from any perform method.
	return z.request('http://stage.developerlevel.com:9999/api/v1/hook/subscribe', httpOptions)
		.then((response) => {
				z.console.log("The response from API webhook subscribe: ")
				z.console.log(JSON.parse(response.content));
				return JSON.parse(response.content);
		});
};

const unsubscribeHook = (z, bundle) => {
	// bundle.subscribeData contains the parsed response JSON from the subscribe
	// request made initially.
	const hookId = bundle.subscribeData.id;

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: `http://stage.paladinarcher.com:9999/api/v1/hook/unsubscribe?hookId=${hookId}`,
		method: 'DELETE',
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => JSON.parse(response.content));
};

const getAarcStatus = (z, bundle) => {
	const options = {
		url: 'http://stage.developerlevel.com:9999/api/v1',
		params: {
			style: bundle.inputData.style // Not used
		}
	};
	
	return z.request(options)
		.then((response) => JSON.parse(response.content));
}

const getFallbackAarcStatus = (z, bundle) => {
	const options = {
		url: 'http://stage.developerlevel.com:9999/api/v1',
		params: {
			style: bundle.inputData.style // Not used
		}
	};
	
	return z.request(options)
		.then((response) => JSON.parse(response.content));
}

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'aarc_webhook',
	
	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'AarcWebhook',
	display: {
		label: 'Aarc Webhook Status',
		description: 'Use aarc\'s webhook status reporting.'
	},

	// `operation` is where the business logic goes.
	operation: {
		// `inputFields` can define the fields a user could provide,
		// we'll pass them in as `bundle.inputData` later.
		inputFields: [
			{key: 'style', type: 'string', helpText: 'Which styles of aarc this should trigger on.'}
		],
	
		type: 'hook',
	
		performSubscribe: subscribeHook,
		performUnsubscribe: unsubscribeHook,
	
		perform: getAarcStatus,
		performList: getFallbackAarcStatus,
	
		// In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
		// from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
		// returned records, and have obviously dummy values that we can show to any user.
		sample: {
			id: 0,
			status: 200,
			message: "Success",
			data: { 
				name: 'Paladin and Archer Zapier Test',
				version: '1.0.0.0',
				now: 'February 11th 2019, 7:42:17 pm'
			}
		},

		// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
		// field definitions. The result will be used to augment the sample.
		// outputFields: () => { return []; }
		// Alternatively, a static field definition should be provided, to specify labels for the fields
		outputFields: [
			{key: 'id', label: 'ID'},
			{key: 'status', label: 'Status Code'},
			{key: 'messsage', label: 'Message'},
			{key: 'data', label: 'Data'},
		]
	}
};