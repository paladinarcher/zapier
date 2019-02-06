const subscribeHook = (z, bundle) => {
	// `z.console.log()` is similar to `console.log()`.
	z.console.log('aarc subscribeHook');
	
	// bundle.targetUrl has the Hook URL this app should call when a recipe is created.
	const data = {
		url: bundle.targetUrl,
		style: bundle.inputData.style
	};
	
	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: 'http://stage.paladinarcher.com:9999/api/v1/hook/subscribe',
		method: 'POST',
		body: JSON.stringify(data)
	};
	
	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => {
				const content = "subscribeHook " +	JSON.parse(response.content);
				z.console.log(content);
				return content;
		});
};
	
const unsubscribeHook = (z, bundle) => {
	// bundle.subscribeData contains the parsed response JSON from the subscribe
	// request made initially.
	const hookId = bundle.subscribeData.id;

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: `http://stage.paladinarcher.com:9999/api/v1/hook/unsubscribe${hookId}`,
		method: 'DELETE',
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => JSON.parse(response.content));
};

const getAarcStatus = (z, bundle) => {
	z.console.log(bundle);
	return [{
		id: 0,
		message: bundle.data.message,
	}];
}

const getFallbackAarcStatus = (z, bundle) => {
	z.console.log(bundle);
	return [{
		id: 0,
		message: bundle.data.message,
	}];
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
			id: 1,
			createdAt: 1472069465,
			name: 'Best Spagetti Ever',
			authorId: 1,
			directions: '1. Boil Noodles\n2.Serve with sauce',
			style: 'italian',
		},

		// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
		// field definitions. The result will be used to augment the sample.
		// outputFields: () => { return []; }
		// Alternatively, a static field definition should be provided, to specify labels for the fields
		outputFields: [
			{key: 'id', label: 'ID'},
			{key: 'createdAt', label: 'Created At'},
			{key: 'name', label: 'Name'},
			{key: 'directions', label: 'Directions'},
			{key: 'authorId', label: 'Author ID'},
			{key: 'style', label: 'Style'},
		]
	}
};