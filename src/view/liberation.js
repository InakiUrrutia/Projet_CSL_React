import React from 'react';

function objectsEquals(o1, o2){
    return(Object.keys(o1).length === Object.keys(o2).length 
              && Object.keys(o1).every(p => o1[p] === o2[p]));
}

export default class Liberation extends React.Component{

    constructor(){
        super()
        this.state = {
            prisoners: [],
            prisoners_updated: false
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
                    if(!objectsEquals(out, this.state.prisoners)){
                        this.setState({prisoners: out.result, prisoners_updated: true});
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

    async deletePrisoner(){
        let date_dec;
        if( document.getElementById('date_decision').value !== "" && typeof document.getElementById('date_decision').value === 'string'){
            date_dec = document.getElementById('date_decision').value;
        }
        else throw new Error("view/liberation.js : deletePrisoner() -> date is empty or not a string");
        if( document.getElementById('lib_select').selectedIndex === null ){
            console.log('Selectionnez un prisonier');
        }
        else{
            let select = document.getElementById("lib_select");
            let index = select.options[select.selectedIndex].id;
            let array = this.state.prisoners.sort(this.compare);
            let prisoner = {
                lastname: array[index].lastname,
                firstname: array[index].firstname
            }
            console.log(array[index]);
            await fetch('http://localhost:8080/prisoners/delete', 
                        {
                            method:'DELETE',
                            headers:{"Content-Type": "application/json"},
                            body: JSON.stringify({prisoner: prisoner})
                        }
                    )
                    .then((res) => {
                        console.log('prisonier libéré');
                        select.remove(select.selectedIndex);
                        fetch('http://localhost:8080/cases/read', {method:'GET'})
                        .then(res => res.json())
                        .then((out) => {
                            let one_case = out.result.filter((o) => {
                                return o.prisoner_number === array[index].num;
                            });
                            this.deleteCase(one_case);
                        });
                    });
        }
        
    }

    async deleteCase(one_case){
        let del_case = {case_name: one_case[0].case_name};
        console.log(del_case);
        await fetch('http://localhost:8080/cases/delete', 
                    {
                        method: 'DELETE',
                        headers:{"Content-Type": "application/json"},
                        body: JSON.stringify({case: del_case})
                    })
                    .then((res) => console.log('affaire supprimée'))
    }

    render(){
        return(
            <div id="Liberation">
                <div>
                    <p>Date decision : </p>
                    <input id="date_decision" type="text" placeholder="dd/mm/aaaa"></input>
                </div>
                <div>
                    <p>Choisir prisonier :</p>
                    <select id="lib_select">
                        {this.createSelectItems(this.state.prisoners)}
                    </select>
                </div>
                <div>
                    <button id="lib_valider" onClick={() => this.deletePrisoner()}>Valider</button>
                </div>
            </div>
        );
    }
}