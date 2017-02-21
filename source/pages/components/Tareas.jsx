import React, {Component} from 'react';

import styles from '../../shared/styles.css'

import * as firebase from 'firebase';


function writePostData(userId, contenido, fecha, Ntarea) {
  firebase.database().ref('tareas/' + userId + '/' + Ntarea).set({
    cont: contenido,
    fecha,
  });
}

class Tareas extends Component{

	constructor(props) {
		super(props);
		this.state={
			Ntareas: 0,
			Ltareas: [],
			Otareas:[],
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(e) {
		const esto = this;
		const starCountRef = firebase.database().ref('Tareas/' + this.props.uid);
		starCountRef.on('value', function(snapshot) {

			snapshot.forEach(ActLista)

		});
    //Funcion que permite actualizar estado
		function ActLista(Tarea) {

			esto.setState({
				Ltareas: esto.state.Ltareas.concat(Tarea.key),
				Otareas: esto.state.Otareas.concat(Tarea.val()),
			})
		}
		
	}	

	componentWillReceiveProps(nextProps) {
		if (this.props.content != nextProps.content && nextProps.content != "" && nextProps.content != " ") {

			writePostData(nextProps.uid,nextProps.content,nextProps.registro, this.state.Ntareas + 1);

			this.setState({
				Ntareas: this.state.Ntareas + 1,
				Ltareas: this.state.Ltareas.concat(nextProps.content),
				Lregistro: this.state.Lregistro.concat(nextProps.registro),
			})
		} 

	}

	handleClick(e){

		this.state.Ltareas.splice(e.target.name,1);

		this.setState({
			Ntareas: this.state.Ntareas - 1,
		})

	}

	render(){
		return( 
			<section className={styles.contenido}>{
				this.state.Ltareas.map(
					(tarea,index) => 
						<div className={styles.item}>
							<h3>{this.state.Otareas[index].Titulo}</h3>
							
							<p className={styles.texto}>{this.state.Otareas[index].Contenido}</p>	

							<div className={styles.fecha}>
								<h5>{this.state.Otareas[index].Creada}</h5>
							</div>
							<button name={index} onClick={this.handleClick}>x</button>
						</div>
				)}
			</section>

		);

	}

}


export default Tareas;