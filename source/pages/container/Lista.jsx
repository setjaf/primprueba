import React,{Component} from 'react';
import {Redirect} from 'react-router'

import Tareas from '../components/Tareas.jsx';
import styles from '../../shared/styles.css';


function minutos(min) {
	if (min < 10) {
		min="0"+min;
		return min;
	}else{
		return min;
	}
}

class Lista extends Component {
	
	constructor(props) {
		super(props);
		this.state={
			Registro: '',
			Value: '',
			Tarea: '',
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	handleClick(){
		let hola = new Date();
		let mes=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
		let fecha = hola.getDate() + " " + mes[hola.getMonth()] + " " + minutos(hola.getHours()) +":"+ minutos(hola.getMinutes());
		if ( this.state.Value!='' && this.state.Value!=' ') 
			{
				this.setState({
					Registro: fecha,
					Tarea: this.state.Value,
					Value: '',
				})
			}
	}

	handleChange(event){
		this.setState({
			Value: event.target.value,
		})
	}

	render(){
		const log = this.props.location.state;
		return(
				log ? 
					(
						<div>
							<h2 className={styles.subtit}>Agrega una tarea:</h2>
							<section className={styles.contenido}>
								<div className={styles.item}>
									<div contenteditable="true" aria-multiline="true" role="textbox" tabindex="0" className={styles.textarea} spellcheck="true" onChange={this.handleChange}></div>
									
									<button onClick={this.handleClick}>
						       +
						      </button>
								</div>
					      <Tareas content={this.state.Tarea} registro={this.state.Registro} {...log}/>
					      	      
							</section>
						</div>
					) 
				: 
					(
						<Redirect to={
              {
                pathname: '/',
              }
            }/>
					)
		);			
	}

}
export default Lista;