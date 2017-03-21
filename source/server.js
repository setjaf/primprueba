import http from 'http';
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {ServerRouter, createServerRenderContext} from 'react-router';

import Pages from './pages/container/Pages.jsx';
import Layout from './shared/Layout.jsx';
const port = process.env.PORT|| 3000;
const domain = process.env.NODE_ENV==='production' ? 'https://tareassj-22b9f.firebaseapp.com':'http://localhost:3001/';


function requestHandler(request,response) {
	const context = createServerRenderContext();


	let html = renderToString(
		
	  <ServerRouter location={request.url} context={context}>

	  	<Pages />

	  </ServerRouter>
	
	);

	const result = context.getResult();

	response.setHeader('Content-Type','text/html');

	if (result.redirect) {
		response.writeHead(301,
		{
			Location:result.redirect.pathname,
		});

	}

	if (result.missed) {
		response.writeHead(404);

		html = renderToString(
			<ServerRouter location={request.url} context={context}>

				<Pages/>


			</ServerRouter>
		);

	}

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

server.listen(port);
