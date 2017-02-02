import React, {Component} from 'react';

import styles from '../../shared/styles.css'

class Tareas extends Component{

	constructor(props) {
		super(props);
		this.state={
			Ntareas: 0,
			Ltareas: [],
			Lregistro:[],
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.content != nextProps.content && nextProps.content != "" && nextProps.content != " ") {
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
							<button name={index} onClick={this.handleClick}>x</button>
							
							<p className={styles.texto}>{tarea}</p>	

							<div className={styles.fecha}>
								<h5>{this.state.Lregistro[index]}</h5>
							</div>
						</div>
				)}
			</section>

		);

	}

}


export default Tareas;