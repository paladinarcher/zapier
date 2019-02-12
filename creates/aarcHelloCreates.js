const aarcHelloCreates = (z, bundle) => {
	return {
        url: 'http://localhost:8888/api/v1/receiveData',
        method: 'POST',

        json: JSON.stringify({
          name: "name",
          directions: "directions",
          authorId: "authorId",
          style: "style",
        }),
        headers: {
          'content-type': 'application/json',

          // This is NOT how you normally do authentication. This is just to demo how to write a create here.
          // Refer to this doc to set up authentication:
          // https://zapier.github.io/zapier-platform-cli/#authentication
          'X-API-Key': 'secret'
        }
      };
}

module.exports = {
  key: 'aarcCreates',
  noun: 'AarcCreates',

  display: {
    label: 'AarcCreates',
    hidden: false,
    description: 'creates bla bla bla in this description'
  },

  operation: {
    inputFields: [

    ],
	perform: aarcHelloCreates,
    sample: {id: 4, foo: "bar"}
  }
};
