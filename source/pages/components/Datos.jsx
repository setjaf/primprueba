import React,{Component} from 'react'
import {Redirect} from 'react-router'
import * as firebase from 'firebase'

import styles from '../../shared/styles.css';


class Datos extends Component {
	
	constructor(props) {
		super(props);
		this.state={
			img:"",
			nombre: "",
			estado:false,
			signOut:true,
		};

		this.handleClickSalir = this.handleClickSalir.bind(this);
		/*this.handleClick = this.handleClick.bind(this);*/
	}

	
	componentDidMount() {
		const esto=this;
		const connectedRef = firebase.database().ref(".info/connected");
		connectedRef.on("value", function(snap) {
		  if (snap.val() === true) {
		    esto.setState({
		    	estado:true,
		    });
		  } else {
		  	alert("Por el momento no cuentas con conexión a internet, por favor no cierres la pestaña hasta que tengas conexión nuevamente")
		  	esto.setState({
		    	estado:false,
		    });
		  }
		});
		this.setState({
			img:this.props.photo,
			nombre:this.props.user,
		});
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

	render() {
		
		return(
			this.state.signOut ? (
			<div className={styles.Datos}>
				<div className={styles.user}>
					<img src={this.state.img} title={this.state.user} className={styles.imgU}/> <h2 className={styles.nombreU}>{this.state.nombre}</h2>	
				</div>
				<div className={styles.user}>
					<h4 className={styles.estadoU}>{this.state.estado ? "Online" : "Offline"}</h4> <button className={styles.botonS} onClick={this.handleClickSalir}>Salir</button>
				</div>
			</div>):(
			<Redirect to={
              {
                pathname: '/',
              }
            }/>

			)
		)
	}
}

export default Datos;