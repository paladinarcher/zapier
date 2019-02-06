const aarcHelloCreates = (z, bundle) => {
  console.log("hello aarcHelloCreates");
  const responsePromise = z.request({
	  url: 'http://stage.paladinarcher.com:9999/api/v1'
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

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
