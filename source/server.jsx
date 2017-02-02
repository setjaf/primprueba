import http from 'http';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';

import Lista from './pages/container/Lista.jsx';
import Layout from './shared/Layout.jsx';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://setjafet-sfs.now.sh'
  : 'http://localhost:3001';

function requestHandler(request , response) {

	let html = renderToString(
		 	<Lista />
	);

	response.setHeader('Content-Type','text/html');

	response.write(
		renderToStaticMarkup(
			<Layout
				title="Aplicación"
				content={html}
				domain={domain}
			/>
		)
	);
	response.end();

}

const server = http.createServer(requestHandler);

server.listen(3000);
