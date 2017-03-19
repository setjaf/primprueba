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
	const divStyle = {
	  width: '100%',
	};
	return(

		<main role="application" style={divStyle}>

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
			<Miss	component={Login} />	

		</main>

	)
}

export default Pages;
