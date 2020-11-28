/* React file */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Prisoner from './view/prisoner';
import Incarceration from './view/incarceration';
import Decision from './view/decision';


// Retourne 1 bouton
function Button(props){
  if(props.page === props.text){
    return(
      <button className="active" id={props.id} onClick={props.onClick}>
        {props.text}
      </button>
    );
  }
  else{
    return(
      <button id={props.id} onClick={props.onClick}>
        {props.text}
      </button>
    );
  } 
}
  
class App extends React.Component{
    constructor(){
      super();
      this.state = {
        page: "Accueil",
        cases: []
      }; 
    }

    // Retoune le titre de la page + les boutons pour naviguer
    navbar(){
      return (
        <header>
          <h1>Prison de Nantes</h1>
          <div id="navbar">
              <Button page={this.state.page} key={0} id={"btnAccueil"} text={"Accueil"} onClick={() => {this.setState({page:"Accueil"}); console.log("Accueil")} }/>
              <Button page={this.state.page} key={1} id={"btnPrisoniers"} text={"Prisoniers"} onClick={() => {this.setState({page:"Prisoniers"}); console.log("Prisoniers");} }/>
              <Button page={this.state.page} key={2} id={"btnIncarceration"} text={"Incarceration"} onClick={() => {this.setState({page:"Incarceration"}); console.log("Incarceration")} }/>
              <Button page={this.state.page} key={3} id={"btnDecision"} text={"Decision"} onClick={() => {this.setState({page:"Decision"}); console.log("Decision")} }/>
          </div>
        </header>
      )
    }

    // Rendu quand on clique sur le bouton Accueil
    renderAccueil(){
      return (
        <div>
          {this.navbar()}
        </div>
      );
    }
    
    renderPrisoners(){
      return(
        <div>
          {this.navbar()}
          <div id={this.state.page}>
            <Prisoner />
          </div>
        </div>  
      );
    }
    
    // Rendu quand on clique sur le bouton Incarceration
    renderIncarceration(){
      return (
        <div>
          {this.navbar()}
          <div id={this.state.page}>
            <Incarceration />
          </div>
        </div>
      );
    }

    // Rendu quand on clique sur le bouton Incarceration
    renderDecision(){
      return (
        <div>
          {this.navbar()}
          <div id={this.state.page}>
            <Decision />
          </div>
        </div>
      );
    }
  
    render(){
      if(this.state.page === 'Accueil'){
        return this.renderAccueil()
      }
      if(this.state.page === 'Prisoniers'){
       return this.renderPrisoners()
      }
      if(this.state.page === 'Incarceration'){
        return this.renderIncarceration()
      }
      if(this.state.page === 'Decision'){
        return this.renderDecision()
      }
    }

}
  
ReactDOM.render( <App />, document.getElementById('app') );