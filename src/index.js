/* React file */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Prisoner from './view/prisoner'


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
              <Button page={this.state.page} key={2} id={"btnAffaires"} text={"Affaires"} onClick={() => {this.setState({page:"Affaires"}); console.log("Affaires")} }/>
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
          <div id="Prisoniers">
            <Prisoner />
          </div>
        </div>  
      );
    }
    
    // Rendu quand on clique sur le bouton Affaires
    renderAffaires(){
      return (
        <div>
          {this.navbar()}
          <div id={this.state.page}>
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
      if(this.state.page === 'Affaires'){
        return this.renderAffaires()
      }
    }

}
  
ReactDOM.render( <App />, document.getElementById('app') );