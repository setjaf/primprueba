import React from 'react';
import styles from './styles.css';

function Layout(props) {
	return(
			<html>
			<head>
				<meta charSet="utf-8"/>
				<title>Lista de tareas</title>
				<link
					rel="stylesheet"
					href={`${props.domain}/styles.css`}
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
				/>

			</head>
			<body>

			<nav className={styles.nav}>
				<h1 className={styles.tit}>SetJaf</h1>
				<ul className={styles.listanav}>
					<li className={styles.ligas}><a href="#">GitHub</a></li>
					<li className={styles.ligas}><a href="#">LinkedIn</a></li>
					<li className={styles.ligas}><a href="#">BackstageCLTV</a></li>
					<li className={styles.ligas}><a href="#">SetJaf</a></li>
				</ul>
			</nav>
			
				<div
				className={styles.contenedor}
					id="render-target"
					dangerouslySetInnerHTML={{
						__html: props.content,
					}}
				/>


			<script src={`${props.domain}/app.js`}/>
			</body>
</html>

	);
}

export default Layout;