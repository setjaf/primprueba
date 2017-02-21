import React from 'react';
import {
	Match,
	Miss,
	link,
} from 'react-router';

import Login from './Login.jsx';
import Lista from './Lista.jsx';
import Error404 from './Error404.jsx';

function Pages(){
	return(

		<main role="application">

			<Match
				pattern="/"
				exactly
				component={Login}
			/>
			<Match
				pattern="/lista"
				exactly
				component={Lista}
			/>
			<Miss	component={Error404} />	

		</main>

	)
}

export default Pages;
