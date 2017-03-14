import React, {Component} from 'react';

import styles from '../../shared/styles.css'

import * as firebase from 'firebase';



function writePostData(userId, Contenido, idTareas, Titulo, Registro,Finaliza) {	
	let generarId = firebase.database().ref('Tareas/' + userId).push().key;
  
  firebase.database().ref('Tareas/' + userId+ "/"+generarId).set({
  	Contenido: 
		 Contenido,
		Creada: 
		 Registro,
		Estado: 
		 "activa",
		Finaliza: 
		 Finaliza,
		Titulo:
		 Titulo,

  });

}

function ordenar (ObjLista,IdLista,TarOrd) {
	let fechas=[],fecha1,fecha2;
	if(!TarOrd.length){
		fechas=fechas.concat(ObjLista[0].Finaliza);
		TarOrd=TarOrd.concat(IdLista[0]);
	}else{
		TarOrd.map((id,index)=>{
			fechas=fechas.concat(ObjLista[IdLista.indexOf(id)].Finaliza)
		})
	}

	IdLista.map((tarea,index) =>{
		
			if (TarOrd.indexOf(tarea) == -1) {

				fecha1=new Date(ObjLista[index].Finaliza);
				
				for (var i = 0; i <= fechas.length; i++) {
					fecha2=new Date(fechas[i]);

					if(fecha1 < fecha2){
						TarOrd.splice(i,0,tarea)
						break;
					}
					else if(i==fechas.length){
						TarOrd.splice(i,0,tarea)
						break;
					}
				}
			
			}


		}

	)
	return TarOrd;
}

class Tareas extends Component{

	constructor(props) {
		super(props);
		this.state={
			Ntareas: 0,
			Ltareas: [],
			Otareas:[],
			TOrdenadas: [],
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleClickOk = this.handleClickOk.bind(this);
	}

	componentDidMount(e) {
		const esto = this;
		const cargaDatos = firebase.database().ref('Tareas/' + this.props.uid).orderByChild("Estado").equalTo("activa");
		const connectedRef = firebase.database().ref(".info/connected");
		connectedRef.on("value", function(snap) {
		  if (snap.val() === true) {
		    alert("connected");
		  } else {
		    alert("not connected");
		  }
		});
		cargaDatos.on('value', function(snapshot) {

			snapshot.forEach(ActLista)

		});
    //Funcion que permite actualizar estado
		function ActLista(Tarea) {

			if (esto.state.Ltareas.indexOf(Tarea.key) === -1) {

				esto.setState({
					Ltareas: esto.state.Ltareas.concat(Tarea.key),
					Otareas: esto.state.Otareas.concat(Tarea.val()),
				})
			}
			
		}
		
	}	

	componentWillReceiveProps(nextProps) {
		
		if (nextProps.contenido!="" && nextProps.titulo!="" && nextProps.registro!=""){

			
			writePostData(nextProps.uid,nextProps.contenido,this.state.Ltareas,nextProps.titulo,nextProps.registro,nextProps.finaliza);

			this.setState({
				Ntareas: this.state.Ntareas + 1,
			})
		} 
	}

	handleClick(e){
		let LT=this.state.Ltareas.indexOf(this.state.TOrdenadas[e.target.name]), TO=e.target.name;

		firebase.database().ref('Tareas/' + this.props.uid + "/"+this.state.TOrdenadas[TO]).remove();		
		this.state.Ltareas.splice(LT,1);
		this.state.Otareas.splice(LT,1);
		this.state.TOrdenadas.splice(TO,1);

		
		this.setState({
			Ntareas: this.state.Ntareas - 1,
		})

	}
	handleClickOk(e){
		let LT=this.state.Ltareas.indexOf(this.state.TOrdenadas[e.target.name]), TO=e.target.name;
		firebase.database().ref('Tareas/' + this.props.uid + "/"+this.state.TOrdenadas[TO]).update({Estado:"inactiva"});
		this.state.Ltareas.splice(LT,1);
		this.state.Otareas.splice(LT,1);
		this.state.TOrdenadas.splice(TO,1);
		
		this.setState({
			Ntareas: this.state.Ntareas - 1,
		})
	}

	render(){
		let index=[],vencida=[],hoy=new Date(),vence;
		if (this.state.Otareas[0]) {
			this.state.TOrdenadas=ordenar(this.state.Otareas,this.state.Ltareas,this.state.TOrdenadas);
			this.state.TOrdenadas.map( (id) => {
				index=index.concat(this.state.Ltareas.indexOf(id))
				vence = new Date (this.state.Otareas[this.state.Ltareas.indexOf(id)].Finaliza); 
				if (hoy > vence) {vencida=vencida.concat(true)} else {vencida=vencida.concat(false)}
			})
		}

		return( 
			<section className={styles.contenido}>{
				index.map(
					(id, tarea) => 
						
						<div className={vencida[tarea]?styles.itemven:styles.item} key={this.state.Ltareas[tarea]}>
							<h3 className={styles.titulo}>{this.state.Otareas[id].Titulo}</h3>
							
							<p className={styles.texto}>{this.state.Otareas[id].Contenido}</p>	

							<div className={styles.fecha}>
								<h5>{this.state.Otareas[id].Finaliza}</h5>
							</div>
							<div className={styles.botones}>
								<button className={styles.bBotonA} name={tarea} key={this.state.Ltareas[id]} onClick={this.handleClick}>x</button>
								<button className={styles.bBotonA} name={tarea} key={this.state.Ltareas[id]+"ok"} onClick={this.handleClickOk}>ok</button>
							</div>
						</div>
					
						
				)}
			</section>

		);

	}

}


export default Tareas;