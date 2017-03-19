import React from 'react';
import styles from './styles.css';

function Layout(props) {
	return(
			<html>
			<head>
				<meta charSet="utf-8"/>
				<title>Lista de tareas</title>
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1"/>
				<link
					rel="stylesheet"
					href={`${props.domain}/styles.css`}
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
				/>
				<link
					rel="stylesheet"
					href="https://tareassj-22b9f.firebaseapp.com/style.css"
				/>
				
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/0.41.1/react-datepicker.min.css" />

			</head>
			<body>

			<nav className={"nav"}>
				<h1 className={"tit"}>TareasSJ</h1>
			</nav>
			
				<div
					id="render-target"
					dangerouslySetInnerHTML={{
						__html: props.content,
					}}
				/>
			<nav className={"foo"}>
				<h1 className={"tit"}>SetJaf</h1>
				<ul className={"listanav"}>
					<li className={"ligas"}><a href="https://github.com/setjaf/" target="_blank">GitHub</a></li>
				</ul>
			</nav>

			<script src={`${props.domain}/app.js`}/>

			</body>
</html>

	);
}

export default Layout;