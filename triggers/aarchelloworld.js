const aarcHelloWorld = (z, bundle) => {
  const responsePromise = z.request({
	  url: 'http://stage.paladinarcher.com:9999/api/v1'
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'aarc',
  noun: 'Aarc',

  display: {
    label: 'Get Aarc Status',
    hidden: false,
    description: 'bla bla bla in this description'
  },

  operation: {
    inputFields: [

    ],
    perform: aarcHelloWorld,
    sample: {id: 5, foo: "bar"}
  }
};
