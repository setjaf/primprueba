const server = require('./webpack/webpack.config.server.js');
const client = require('./webpack/webpack.config.client.js');
module.exports = [

	server,
	client,

];