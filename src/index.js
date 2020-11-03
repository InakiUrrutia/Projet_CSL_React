import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Retourne 1 bouton
function Button(props){
  return(
      <button id={props.id} onClick={props.onClick}>
        {props.text}
      </button>
    );
}

// Retourne 1 prisonier
function Prisoner(props){
    return(
      <li id={props.index}>
        <p>{props.name}</p>
        <button className="delete_button" onClick={props.onClick}>X</button>
      </li>
    );
  }
  
  class App extends React.Component{
    constructor(){
      super();
      this.state = {
        page: "Prisoniers",
        prisoners: [],
        affaires: []
      };
      
    }

    // Retoune le titre de la page + les boutons pour naviguer
    navbar(){
      return (
        <div>
          <h1>{this.state.page}</h1>
          <div id="navbar">
              <Button key={0} id={"btnAccueil"} text={"Accueil"} onClick={() => {this.setState({page:"Accueil"}); console.log("Accueil")} }/>
              <Button key={1} id={"btnPrisoniers"} text={"Prisoniers"} onClick={() => {this.setState({page:"Prisoniers"}); console.log("Prisoniers")} }/>
              <Button key={2} id={"btnAffaires"} text={"Affaires"} onClick={() => {this.setState({page:"Affaires"}); console.log("Affaires")} }/>
          </div>
        </div>
      )
    }

    // Fonction de la classe React.Component, ne s'execute qu'une fois a chaque rendu
    async componentDidMount(){
      switch(this.state.page){
        case 'Accueil':
          break;
        case 'Prisoniers':
          await fetch('http://localhost:8080/prisoners/read', {method: 'GET'}) // Envoi requete au serveur
          .then(res => res.json()) // Reponse de la requete
          .then((out) => { // Données a recuperer
            this.setState({prisoners: out.result});
          });
          break;
        case 'Affaires':
          break;
        default:
          break;
      }
    }

    // Rendu quand on clique sur le bouton Accueil
    renderAccueil(){
      return (
        <div>
          {this.navbar()}
        </div>
      );
    }
  
    // Rendu quand on clique sur le bouton Prisoniers
    renderPrisoner(){
      let prisoners_array = [];
      this.state.prisoners.forEach((elt, i) => {
        prisoners_array.push(<Prisoner index = {i} key = {i} name = {elt.name} onClick = {() => console.log(i)} />);
      });
      return (
        <div>
          {this.navbar()}
          <div id={this.state.page}>
            <ul> 
              {prisoners_array}
            </ul>
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
            <ul> 
            </ul>
          </div>
        </div>
      );
    }
  
    render(){
      if(this.state.page === 'Accueil'){
        return this.renderAccueil()
      }
      if(this.state.page === 'Prisoniers'){
        return this.renderPrisoner()
      }
      if(this.state.page === 'Affaires'){
        return this.renderAffaires()
      }
    }

  }
  
  ReactDOM.render( <App />, document.getElementById('app') );