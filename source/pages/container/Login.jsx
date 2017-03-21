import React,{Component} from 'react';
import * as firebase from 'firebase'
import {BrowserRouter, Redirect} from 'react-router'


import styles from '../../shared/styles.css';


const config = {
    apiKey: "AIzaSyA3rp2bNVh4LfwP6KvFqBHgfx6TX2EtmCI",
    authDomain: "tareassj-22b9f.firebaseapp.com",
    databaseURL: "https://tareassj-22b9f.firebaseio.com",
    storageBucket: "tareassj-22b9f.appspot.com",
    messagingSenderId: "1008608496311"
  };

  firebase.initializeApp(config);


 class Login extends Component{
 	
 	constructor(props) {
 		super(props);
 		this.state = ({
 			loggin: false,
      user: "",
      correo: "",
      photo: "",
      uid:"",
 		})
 		this.handleClick = this.handleClick.bind(this);
    this.logeado = this.logeado.bind(this);
 	}

  logeado(prueba){
    if(prueba){
      this.setState({
        loggin:true,
        user: prueba.displayName,
        correo: prueba.email,
        photo: prueba.photoURL,
        uid:prueba.uid,
      })
    }
  }

 	handleClick(){
    const esto = this;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let user= result.user
      esto.logeado(user);
    })
 	}

 	render(){
    const logged = this.state.loggin;
    let {user,correo,photo,uid}=this.state;
 		return(
 			<div className={styles.login}>
        {
          logged ? 
          (
            <Redirect to={
              {
                pathname: '/lista', 
                state:{
                  log:true,
                  user,
                  correo,
                  photo,
                  uid
                }
              }
            }/>
          ):
          (
            <button onClick={this.handleClick} className={styles.loginB}>Login Google</button>
          )
        }
 				
 			</div>
 		)
 	}
 

 }

export default Login; 