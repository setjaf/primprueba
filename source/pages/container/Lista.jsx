import React,{Component} from 'react';

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
		return(
			<div>
			<h2 className={styles.subtit}>Agrega una tarea:</h2>
			<section className={styles.contenido}>
				<div className={styles.item}>
					<textarea name="textarea" value={this.state.Value}rows="10" cols="50" onChange={this.handleChange}/>
					
					<button onClick={this.handleClick}>
		       +
		      </button>
				</div>
	      <Tareas content={this.state.Tarea} registro={this.state.Registro}/>
	      	      
			</section>
			</div>
		);			
	}

}
export default Lista;