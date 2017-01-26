import React, {Component} from 'react';


class Tareas extends Component{

	constructor(props) {
		super(props);
		this.state={
			Ntareas: 0,
			Ltareas: [],
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.content != nextProps.content) {
			this.setState({
				Ntareas: this.state.Ntareas + 1,
				Ltareas: this.state.Ltareas.concat(nextProps.content),
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

			<div>
				<ul>

					{
						this.state.Ltareas.map(
							(tarea,index) => 
							<li>
								<button name={index} onClick={this.handleClick}>X</button>
								{tarea}
							</li>
						)

					}
					
				</ul>
			</div>

		)

	}

}


export default Tareas;