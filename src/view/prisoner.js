import React from 'react';

// Retourne 1 prisonier
function ReactPrisoner(props){
    return(
      <tr id={props.index}>
        <td><input type="checkbox" onChange={props.onChange}></input></td>
        <td><p>{props.num}</p></td>
        <td><p>{props.lastname}</p></td>
        <td><p>{props.firstname}</p></td>
        <td><p>{props.dob}</p></td>
        <td><p>{props.cob}</p></td>
        <td><button className="delete_button" onClick={props.onClick}>X</button></td>
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

    async addPrisoner(){
      let new_lastname = 'default_lastname', new_firstname = 'default_firstname', new_date = 'xx/xx/xxxx', new_city = 'default_city';
      try{
        if(document.getElementById("add_lastname").value !== '' && typeof document.getElementById("add_lastname").value === 'string'){
            new_lastname = document.getElementById("add_lastname").value;
        }
        else throw new Error('view/prisoner.js : addPrisoner() -> lastname is empty or not a string')

        if(document.getElementById("add_firstname").value !== '' && typeof document.getElementById("add_firstname").value === 'string'){
            new_firstname = document.getElementById("add_firstname").value;
        }
        else throw new Error('view/prisoner.js : addPrisoner() -> firstname is empty or not a string')

        if(document.getElementById("add_dob").value !== '' && typeof document.getElementById("add_dob").value === 'string'){
          new_date = document.getElementById("add_dob").value;
        }
        else throw new Error('view/prisoner.js : addPrisoner() -> dob is empty or not a string')

        if(document.getElementById("add_cob").value !== '' && typeof document.getElementById("add_cob").value === 'string'){
            new_city = document.getElementById("add_cob").value;
        }
        else throw new Error('view/prisoner.js : addPrisoner() -> cob is empty or not a string')

        let new_prisoner =
          {
            lastname:new_lastname,
            firstname:new_firstname,
            date_naiss:new_date,
            lieu_naiss: new_city
        };
        console.log(new_prisoner);
        await fetch('http://localhost:8080/prisoners/create', 
                    {
                      method:'POST',
                      headers:{"Content-Type": "application/json"},
                      body:JSON.stringify({prisoner:{new_prisoner}})              
                    }
              )
              .then((res) => {
                this.readPrisoner();
              });
      }catch(e){
        console.log(e);
      }
    }

    async updatePrisoner(i){
        let row = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
        let checkbox = row.children[0].children[0];
        if(checkbox.checked){
            console.log('modification');
        }
        else console.log('envoi de la modification au serveur')
    }

    // Rendu quand clic sur le bouton Prisoniers
    render(){
        let prisoners_array = [];
        this.state.prisoners.forEach((elt, i) => {
            prisoners_array.push(
              <ReactPrisoner 
                index = {i} 
                key = {i} 
                onChange={() => this.updatePrisoner(i)}
                num = {elt.num}
                lastname = {elt.lastname} 
                firstname = {elt.firstname} 
                dob = {elt.date_naiss} 
                cob = {elt.lieu_naiss}
                onClick = {() => console.log(i)} />
            );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Modif.</th>
                        <th>Numero</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Date Naissance</th>
                        <th>Lieu Naissance</th>
                        <th>Suppr.</th>
                    </tr>
                </thead>
                <tbody>
                    {prisoners_array}
                    <tr id="add">
                        <td>+</td>
                        <td></td>
                        <td><input id="add_lastname" type="text" placeholder="Nom"></input></td>
                        <td><input id="add_firstname" type="text" placeholder="Prenom"></input></td>
                        <td><input id="add_dob" type="text" placeholder="xx-xx-xxxx"></input></td>
                        <td><input id="add_cob" type="text" placeholder="xxxxx"></input></td>
                        <td><button onClick={() => this.addPrisoner()}>Ajouter</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}