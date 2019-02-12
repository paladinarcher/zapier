const aarcPollTrigger = (z, bundle) => {
	const responsePromise = z.request({
		// url: 'http://stage.paladinarcher.com:9999/api/v1'
		url: 'http://localhost:8888/api/v1'
	});

	return responsePromise
		.then(response => {
			// Response from AARC URL above
			return JSON.parse(response.content);
		});
};

module.exports = {
	key: 'aarc_poll_trigger',
	noun: 'AarcStatusPollingTrigger',

	display: {
		label: 'Get AARC Status via Polling',
		hidden: false,
		description: 'This trigger provides the current status of AARC'
	},

	operation: {
		type: 'polling',
		perform: aarcPollTrigger,
		sample: {"id":0,"status":200,"message":"Success","data":{"name":"Paladin and Archer Zapier Test","version":"1.0.0.0","now":"February 6th 2019, 9:03:31 pm"}}
	}
};
