const aarcHelloCreates = (z, bundle) => {
	return {
        url: 'http://stage.paladinarcher.com:9999/api/v1/receiveData',
        method: 'POST',
        body: JSON.stringify({
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

//	console.log("hello aarcHelloCreates");
//  const responsePromise = z.request({
//	  url: 'http://stage.paladinarcher.com:9999/api/v1/receiveData'
//  });
//  return responsePromise
//    .then(response => {
//		console.log(response.content);
//		return JSON.parse(response.content)[0];
//		//return {foo: "bar"};
//	});
//};

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
