import React from 'react';

function objectsEquals(o1, o2){
    return(Object.keys(o1).length === Object.keys(o2).length 
              && Object.keys(o1).every(p => o1[p] === o2[p]));
}

export default class Reduction extends React.Component{
    constructor(){
        super();
        this.state = {
            prisoners : [],
            prisoners_updated : false
        }
    }

    async componentDidMount(){
        if(!this.state.prisoners_updated){
            this.getPrisoners();
          }
    }

    async getPrisoners(){
        await fetch('http://localhost:8080/prisoners/read', {method: 'GET'}) // Envoi requete au serveur
              .then(res => res.json()) // Reponse de la requete
              .then((out) => { // Données a recuperer
                    let array = [];
                    out.result.forEach(elt => {
                        if(elt.date_dec !== null){
                            array.push(elt);
                        }
                    });
                    if(!objectsEquals(array, this.state.prisoners)){
                        this.setState({prisoners: array, prisoners_updated: true});
                    }
              });
    }

    compare = (a,b) => {
        const nameA = a.lastname.toUpperCase();
        const nameB = b.lastname.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

    createSelectItems = (array) => {
        array.sort(this.compare);
        let options = [];
        for(let i=0; i<array.length; i++){
            options.push(<option key={i} id={i} value={array[i].lastname +" "+ array[i].firstname}>{array[i].lastname + " " + array[i].firstname}</option>)
        }
        return options;
    }

    async updatePrisoner(){
        let date_dec, duree_dec; 
        if(document.getElementById('date_decision').value !== "" && typeof document.getElementById('date_decision').value === 'string'){
            date_dec = document.getElementById('date_decision').value;
        }
        else throw new Error("view/condamnation.js : updatePrisoner() -> date is empty or not a string");
        if(document.getElementById('duree_decision').value !== "" && typeof document.getElementById('duree_decision').value === 'string'){
            duree_dec = document.getElementById('duree_decision').value;
        }
        else throw new Error("view/condamnation.js : updatePrisoner() -> duree is empty or not a string");
        if(document.getElementById('red_select').selectedIndex === null ){
            console.log('Selectionnez un prisonier');
        }
        else{
            let select = document.getElementById("red_select");
            let index = select.options[select.selectedIndex].id;
            let array = this.state.prisoners.sort(this.compare);
            let prisoner = array[index];
            let newfields = {date_dec: date_dec, duree_dec: duree_dec};
            await fetch('http://localhost:8080/prisoners/update', 
                        {
                            method:'PUT',
                            headers:{"Content-Type": "application/json"},
                            body: JSON.stringify({prisoner: prisoner, newfields: newfields})
                        }
                    )
                    .then((res) => {
                        console.log('prisonier mis a jour');
                    });
        }
    }

    render(){
        return(
            <div id="Reduction">
                <div>
                    <p>Date decision : </p>
                    <input id="date_decision" type="text" placeholder="dd/mm/aaaa"></input>
                </div>
                <div>
                    <p>Choisir prisonier :</p>
                    <select id="red_select">
                        {this.createSelectItems(this.state.prisoners)}
                    </select>
                </div>
                <div>
                    <p>Duree emprisonnement : </p>
                    <input id="duree_decision" type="text"></input>
                </div>
                <div>
                    <button id="red_valider" onClick={() => this.updatePrisoner()}>Valider</button>
                </div>
            </div>
        );
    }
}