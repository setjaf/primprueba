import React,{Component} from 'react'
import {Redirect} from 'react-router'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import Tareas from '../components/Tareas.jsx';
import Inactivas from '../components/Inactivas.jsx'
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
			startDate: moment(),
			ValueT: 'Título...',
			ValueC: 'Contenido...',
			ValueF: moment().format("MM/DD/YYYY"),
			Tarea: {
				titulo:"",
				contenido:"",
			},
			send:true,
			signOut:true,
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClickSalir = this.handleClickSalir.bind(this);
		this.handleChangeC = this.handleChangeC.bind(this);
		this.handleChangeT = this.handleChangeT.bind(this);
		this.handleChangeF = this.handleChangeF.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);

	}

	handleClick(){
		let hoy = new Date();
		let mes=["01","02","03","04","05","06","07","08","09","10","11","12"]
		let fecha = hoy.getDate() + "/" + mes[hoy.getMonth()] + "/" + hoy.getFullYear();
		if ( this.state.ValueT!='' && this.state.ValueT!=' ' && this.state.ValueT!='Título...' && this.state.ValueC!='' && this.state.ValueC!=' ' && this.state.ValueC!='Contenido...' && this.state.ValueF!='' && this.state.ValueF!=' ') 
			{

				this.setState({
					
					Tarea: {
						titulo:this.state.ValueT,
						contenido:this.state.ValueC,
						registro: fecha,
						finaliza: this.state.ValueF,
					},
					ValueT: 'Título...',
					ValueC: 'Contenido...',
					ValueF: moment().format("MM/DD/YYYY"),
					send:true,
					startDate: moment(),
				})
			}
	}

	handleClickSalir(){
		let esto=this;
		firebase.auth().signOut().then(function(a) {
			esto.setState({
		  	signOut:false,
		  })
		}, function(error) {
		  console.log(error)
		  alert(error);

		});
	}

	handleChangeF(e){

		this.setState({
			send:false,
			startDate: e,
			ValueF: e.format("MM/DD/YYYY"),
		})
		
	}

	handleChangeC(e){
		this.setState({
			send:false,
			ValueC: e.target.value,
		})
		
	}
	handleChangeT(e){
		this.setState({
			send:false,
			ValueT: e.target.value,
		})		
	}
	handleFocus(e){
		if (this.state.send) {
			this.setState({
				Tarea: {
						titulo:'',
						contenido:'',
						registro: '',
						finaliza: '',
					},
			})
		}
		if (e.target.value==='Título...') {
			this.setState({
				ValueT: '',
			})
		}
		else if (e.target.value==='Contenido...') {
			this.setState({
				ValueC: '',
			})
		}			
	}

	handleBlur(e){
		if (e.target.value==='' && e.target.name==="tit") {
			this.setState({
				ValueT: 'Título...',
			})
		}		
		if (e.target.value==='' && e.target.name==="con") {
			this.setState({
				ValueC: 'Contenido...',
			})
		}
	}

	render(){
		const log = this.props.location.state;
		let pasa;
		console.log(log , this.state.signOut)
		if (log && this.state.signOut) {pasa=true}else{pasa=false}
		console.log(pasa)
		return(
				pasa ? 
					(
						<div>
							<button onClick={this.handleClickSalir}>Salir</button>
							<h2 className={styles.subtit}>Agrega una tarea:</h2>
							<section className={styles.contenido}>
								<div className={styles.agreTar}>
									
									<textarea name={'tit'} className={styles.titText} value={this.state.ValueT} onChange={this.handleChangeT} onFocus={this.handleFocus} onBlur={this.handleBlur} />
									
									<DatePicker className={styles.titText}
										dateFormat="MM/DD/YYYY" selected={this.state.startDate} onChange={this.handleChangeF}
									 />
									<textarea name={'con'} value={this.state.ValueC} onChange={this.handleChangeC} className={styles.contText} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
									<div className={styles.DagreTB}>
										<button className={styles.agreTB} onClick={this.handleClick} >
							       +
							      </button>
							    </div>
								</div>
								{this.state.send ? 
						      (<Tareas  {...log} {...this.state.Tarea}/>):
						      (<Tareas  {...log} contenido="" registro="" titulo=""/>)
					    	}
					    	<Inactivas {...log}/>

					      	      
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