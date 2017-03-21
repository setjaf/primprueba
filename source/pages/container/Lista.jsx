import React,{Component} from 'react'
import {Redirect} from 'react-router'
import * as firebase from 'firebase'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {Editor, EditorState, RichUtils, convertFromRaw,convertToRaw} from 'draft-js';

import Datos from '../components/Datos.jsx';
import Tareas from '../components/Tareas.jsx';
import Inactivas from '../components/Inactivas.jsx'
import Texto from './Texto.jsx';
import styles from '../../shared/styles.css';



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
				registro: "",
				finaliza: "",
				prueba: "",
			},
			send:true,
			conectado:false,
			scroll:false,
			agregar:false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClickA = this.handleClickA.bind(this);
		this.handleChangeC = this.handleChangeC.bind(this);
		this.handleChangeT = this.handleChangeT.bind(this);
		this.handleChangeF = this.handleChangeF.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleScroll = this.handleScroll.bind(this);

	}

	componentDidMount() {
		
		window.addEventListener('scroll',this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}


	handleScroll(){
		const scrolled = window.scrollY;

    if(scrolled >= 160 && this.state.scroll==false){
    	this.setState({
    		send:false,
    		scroll:true,
    	})
    }else if(scrolled<=160 && this.state.scroll==true){
    	this.setState({
    		send:false,
    		scroll:false,
    	})
    }
  }


	handleClick(){
		let hoy = new Date();
		let mes=["01","02","03","04","05","06","07","08","09","10","11","12"]
		let fecha = hoy.getDate() + "/" + mes[hoy.getMonth()] + "/" + hoy.getFullYear();
		let raw = convertToRaw(this.refs.editor.state.editorState.getCurrentContent());
		let contenido=false;
		for (var i = 0; i < raw.blocks.length; i++) {
			if (raw.blocks[i].text!="" && raw.blocks[i].text!=" ") {
				contenido=true;
				raw = JSON.stringify(raw);
				break;
			}
		}

		if (contenido && /*this.state.ValueC!='' && this.state.ValueC!=' ' && this.state.ValueC!='Contenido...' &&*/ this.state.ValueF!='' && this.state.ValueF!=' ') 
			{
				if (this.state.ValueT === 'Título...') {
					this.state.ValueT = null;
				}

				this.setState({
					
					Tarea: {
						titulo:this.state.ValueT,
						registro: fecha,
						finaliza: this.state.ValueF,
						prueba: raw,
					},
					ValueT: 'Título...',
					ValueC: 'Contenido...',
					ValueF: moment().format("MM/DD/YYYY"),
					send:true,
					startDate: moment(),
					agregar:false,
				})
				this.refs.editor.state.editorState=EditorState.createEmpty();
			}
	}

	handleClickA(e){

		if (!this.state.agregar) {
			this.setState({
				send:false,
				agregar:true,
			})
		}else{
			this.setState({
				send:false,
				agregar:false,
			})
		}
		
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
		if (log) {pasa=true}else{pasa=false}
		return(
				pasa ? 
					(
						<div className={styles.contenedor}>

							<Datos {...log}/>
							<button className={this.state.scroll?styles.botonAS:styles.botonA} onClick={this.handleClickA}>+</button>

							<section className={this.state.agregar?styles.contenidoA:styles.contenidoAS}>
							
								<div className={styles.agreTar}>
									
									<textarea name={'tit'} className={styles.titText} value={this.state.ValueT} onChange={this.handleChangeT} onFocus={this.handleFocus} onBlur={this.handleBlur} />
									
									<DatePicker className={styles.titText}
										dateFormat="MM/DD/YYYY" selected={this.state.startDate} onChange={this.handleChangeF}
									 />
									<Texto ref="editor" className={styles.contText}/>
									
									<div className={styles.DagreTB}>
										<button className={styles.agreTB} onClick={this.handleClick} >
							       +
							      </button>
							    </div>
								</div>

							</section>

							{this.state.send ? 
						      (<Tareas  {...log} {...this.state.Tarea}/>):
						      (<Tareas  {...log} contenido="" registro="" titulo=""/>)
					    }
					    
					    <Inactivas {...log}/>

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