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
					<li className={styles.ligas}><a href="https://github.com/setjaf/" target="_blank">GitHub</a></li>
					<li className={styles.ligas}><a href="https://www.linkedin.com/in/set-jafet-renedo-ortega-7407b9136" target="_blank">LinkedIn</a></li>
					<li className={styles.ligas}><a href="http://wwww.bacstagecltv.com" target="_blank">BackstageCLTV</a></li>
					<li className={styles.ligas}><a href="#" target="_blank">SetJaf</a></li>
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