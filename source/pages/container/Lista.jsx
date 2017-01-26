import React,{Component} from 'react';

import Tareas from '../components/Tareas.jsx'

class Lista extends Component {
	
	constructor(props) {
		super(props);
		this.state={
			Ntareas: 0,
			Value: '',
			Tarea: '',
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	handleClick(){
		if ( this.state.Value!='' && this.state.Value!=' ') 
			{
				this.setState({
					Ntareas: this.state.Ntareas + 1,
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

			<section>
				<h2>Introduce la tarea a realizar</h2>
				<input type="text" value={this.state.Value} onChange={this.handleChange} />
				<button onClick={this.handleClick}>
	       boton1 
	      </button>
	      <h3>{this.state.Ntareas}</h3>
	      <Tareas content={this.state.Tarea}/>
	      	      
			</section>

		);
			
	}

}
export default Lista;