fetch('https://gradistore-spi.herokuapp.com/products/all').then(function (response) {
	return response.json();
}).then(function (data) {
	console.log(data);
}).catch(function (err) {
	console.warn('Something went wrong.', err);
});