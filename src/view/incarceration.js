import React from 'react';

export default class Incarceration extends React.Component{

    constructor(){
        super();
        this.state = {
            motives: [],
            motives_updated: false,
        }
    }

    async componentDidMount(){
        if(!this.state.motives_updated){
            this.getMotives();
          }
    }

    resetInputs(){
        document.getElementById("add_lastname").value = "";
        document.getElementById("add_firstname").value = "";
        document.getElementById("add_dob").value = "";
        document.getElementById("add_cob").value = "";
        document.getElementById("add_case").value = "";
        document.getElementById("add_date").value = "";
        document.getElementById("add_jur").value = "";
    }

    async addPrisoner(){
        let new_lastname = 'default_lastname', new_firstname = 'default_firstname', new_date = 'xx/xx/xxxx', new_city = 'default_city';
        let new_name_case = 'default_Axxxx', new_date_case='xx/xx/xxxx', new_jur = 'default_jur', new_motive = 'default_motive';
        try{
            if(document.getElementById("add_lastname").value !== '' && typeof document.getElementById("add_lastname").value === 'string'){
                new_lastname = document.getElementById("add_lastname").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> lastname is empty or not a string')

            if(document.getElementById("add_firstname").value !== '' && typeof document.getElementById("add_firstname").value === 'string'){
                new_firstname = document.getElementById("add_firstname").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> firstname is empty or not a string')

            if(document.getElementById("add_dob").value !== '' && typeof document.getElementById("add_dob").value === 'string'){
                new_date = document.getElementById("add_dob").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> dob is empty or not a string')

            if(document.getElementById("add_cob").value !== '' && typeof document.getElementById("add_cob").value === 'string'){
                new_city = document.getElementById("add_cob").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> cob is empty or not a string')

            if(document.getElementById("add_case").value !== '' && typeof document.getElementById("add_case").value === 'string'){
                new_name_case = document.getElementById("add_case").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> case name is empty or not a string')

            if(document.getElementById("add_date").value !== '' && typeof document.getElementById("add_date").value === 'string'){
                new_date_case = document.getElementById("add_date").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> date is empty or not a string')

            if(document.getElementById("add_jur").value !== '' && typeof document.getElementById("add_jur").value === 'string'){
                new_jur = document.getElementById("add_jur").value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> juridiction is empty or not a string')

            if(document.getElementById("add_motive").selectedIndex !== null){
                let select = document.getElementById("add_motive");
                let index = document.getElementById("add_motive").selectedIndex;
                new_motive = select[index].value;
            }
            else throw new Error('view/incarceration.js : addPrisoner() -> motive no selected index');

            let new_prisoner = 
            {
                lastname:new_lastname,
                firstname:new_firstname,
                date_naiss:new_date,
                lieu_naiss: new_city,
                motive: new_motive,
                date_dec: null,
                duree_dec: null
            };
            
            let new_case;

            await fetch('http://localhost:8080/prisoners/create', 
                        {
                            method:'POST',
                            headers:{"Content-Type": "application/json"},
                            body:JSON.stringify({prisoner:{new_prisoner}})              
                        }
                )
                .then((res) => {
                    this.resetInputs();
                    fetch('http://localhost:8080/prisoners/read',{method: 'GET'})
                    .then(res => res.json())
                    .then((out) => {
                        let prisoner_number = out.result[out.result.length-1].num;
                        new_case = {
                            case: new_name_case,
                            date: new_date_case,
                            jur: new_jur,
                            prisoner: prisoner_number,
                        }
                        this.addCase(new_case);// TODO: Ajouter le fetch pour les cases
                    });
                });
        }catch(e){
            console.log(e);
        }
    }


    async addCase(new_case){
        await fetch('http://localhost:8080/cases/create', 
                {   
                    method:'POST',
                    headers:{"Content-Type": "application/json"},
                    body:JSON.stringify({case:{new_case}})
                }
            )
            .then( (res) => console.log('affaire ajoutée') );
    }


    async getMotives(){
        await fetch('http://localhost:8080/motives/read', {method:'GET'})
        .then(res => res.json())
        .then((out) => {
            this.setState({motives: out.result, motives_updated: true})
        })
    }

    createSelectOptions(motives_array){
        let options = [];
        motives_array.forEach((e,i) => {
            options.push(<option key={i} id={e.id} value={e.name}>{e.id + " " + e.name}</option>)
        });
        return options;
    }

    render(){
        return(
            <div>
                <div>
                    <div id="infos_perso">
                        <h2>Informations Detenu</h2>
                        <label>
                            Nom:
                            <input type="text" id="add_lastname" name="fname" placeholder="Ex: Dupont"></input>
                        </label>
                        <br/>  
                        <label>
                            Prenom:
                            <input type="text" id="add_firstname" name="lname" placeholder="Ex: Marcel"></input>
                        </label>
                        <br/>  
                        <label>
                            Date de Naissance:
                            <input type="text" id="add_dob" name="dob" placeholder="Ex: jj/mm/aaaa"></input>
                        </label>
                        <br/>
                        <label>
                            Lieu de Naissance:
                            <input type="text" id="add_cob" name="cob" placeholder="Ex: Paris"></input>
                        </label>
                    </div>
                    <div id="infos_affaires">
                        <h2>Informations Affaire</h2>
                        <label>
                            Numero Affaire:
                            <input type="text" id="add_case" name="case" placeholder="Ex: A0001"></input>
                        </label>
                        <br/>  
                        <label>
                            Date Affaire:
                            <input type="text" id="add_date" name="date" placeholder="Ex: dd/mm/aaaa"></input>
                        </label>
                        <br/>  
                        <label>
                            Juridiction:
                            <input type="text" id="add_jur" name="jur" placeholder="Ex: Paris"></input>
                        </label>
                        <br/>  
                        <label>
                            Motif:
                            <select id="add_motive" name="motive">
                                {this.createSelectOptions(this.state.motives)}
                            </select>
                        </label>
                    </div>
                </div>
                <button value="Ajouter" onClick={() => this.addPrisoner()}>Ajouter</button>
            </div>
        );
    }
}