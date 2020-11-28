import React from 'react';
import Condamnation from './condamnation';
import Liberation from './liberation';
import Reduction from './reduction';

export default class Decision extends React.Component{
    constructor(){
        super();
        this.state = {
            type_decision: null,
        }
    }

    activeButton(){
        if(this.state.type_decision === 'Condamnation'){
            document.querySelector('.btn1').classList.add('btnactive');
            document.querySelector('.btn2').classList.remove('btnactive');
            document.querySelector('.btn3').classList.remove('btnactive');
        }
        else if(this.state.type_decision === 'Liberation'){
            document.querySelector('.btn2').classList.add('btnactive');
            document.querySelector('.btn1').classList.remove('btnactive');
            document.querySelector('.btn3').classList.remove('btnactive');
        }
        else if(this.state.type_decision === 'Reduction'){
            document.querySelector('.btn3').classList.add('btnactive');
            document.querySelector('.btn2').classList.remove('btnactive');
            document.querySelector('.btn1').classList.remove('btnactive');
        }
    }

    renderButtons(){
        return(
            <div>
                <div>
                    <h3>Choisir le type de decision</h3>
                </div>
                <div>
                    <button className="btn btn1" onClick={() => this.setState({type_decision: "Condamnation"})}>Condamnation</button>
                    <button className="btn btn2" onClick={() => this.setState({type_decision: "Liberation"})}>Liberation Définitive</button>
                    <button className="btn btn3" onClick={() => this.setState({type_decision: "Reduction"})}>Reduction de peine</button>
                    {this.activeButton()}
                </div>
            </div>
        );
    }

    renderCondamnation(){
        return(
            <div>
                {this.renderButtons()}
                <Condamnation />
            </div>
        );
    }

    renderLiberation(){
        return(
            <div>
                {this.renderButtons()}
                <Liberation />
            </div> 
        );
    }

    renderReduction(){
        return(
            <div>
                {this.renderButtons()}
                <Reduction />
            </div>
        );
    }

    render(){
        if(this.state.type_decision === 'Condamnation'){
            console.log('Condamnation');
            return this.renderCondamnation();
        }
        if(this.state.type_decision === 'Liberation'){
            console.log('Liberation Immediate');
            return this.renderLiberation();
        }
        if(this.state.type_decision === 'Reduction'){
            console.log('Reduction de peine');
            return this.renderReduction();
        }
        if(this.state.type_decision === null){
            console.log('null');
            return (
                <div>
                    {this.renderButtons()}
                </div>
            );
        }
    }
}