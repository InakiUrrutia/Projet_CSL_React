import React from 'react';

// Retourne 1 prisonier
function ReactPrisoner(props){
    return(
      <tr id={props.index}>
        <td><p>{props.num}</p></td>
        <td><p>{props.lastname}</p></td>
        <td><p>{props.firstname}</p></td>
        <td><p>{props.dob}</p></td>
        <td><p>{props.cob}</p></td>
        <td><p>{props.motive}</p></td>
        <td><p>{props.duree}</p></td>
        <td><p>{props.date_dec}</p></td>
      </tr>
    );
}

function objectsEquals(o1, o2){
    return(Object.keys(o1).length === Object.keys(o2).length 
              && Object.keys(o1).every(p => o1[p] === o2[p]));
}

export default class Prisoner extends React.Component{
    constructor(){
        super();
        this.state = {
            prisoners : [],
            prisoners_updated : false
        }
    }

    async componentDidMount(){
        if(!this.state.prisoners_updated){
            this.readPrisoner();
          }
    }

    async readPrisoner(){
        await fetch('http://localhost:8080/prisoners/read', {method: 'GET'}) // Envoi requete au serveur
              .then(res => res.json()) // Reponse de la requete
              .then((out) => { // Données a recuperer
                  if(!objectsEquals(out, this.state.prisoners)){
                    this.setState({prisoners: out.result, prisoners_updated: true});
                  }
              });
    }

    // Rendu quand clic sur le bouton Prisoniers
    render(){
        let prisoners_array = [];
        this.state.prisoners.forEach((elt, i) => {
            prisoners_array.push(
              <ReactPrisoner 
                index = {i} 
                key = {i} 
                num = {elt.num}
                lastname = {elt.lastname} 
                firstname = {elt.firstname} 
                dob = {elt.date_naiss} 
                cob = {elt.lieu_naiss}
                motive = {elt.motive}
                duree = {elt.duree_dec}
                date_dec = {elt.date_dec}
              />
            );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Date Naissance</th>
                        <th>Lieu Naissance</th>
                        <th>Motif</th>
                        <th>Duree</th>
                        <th>Date Decision</th>
                    </tr>
                </thead>
                <tbody>
                    {prisoners_array}
                </tbody>
            </table>
        );
    }
}