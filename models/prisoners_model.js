class Prisoner{
    constructor(num, firstname, lastname, date_naiss, lieu_naiss){
        this.num = num;
        this.firstname = firstname;
        this.lastname = lastname;
        this.date_naiss = date_naiss;
        this.lieu_naiss = lieu_naiss;
    }

    getNum(){
        return this.num;
    }

    setNum(n){
        this.num = n;
    }

    getFirstName(){
        return this.firstname;
    }

    setFirstName(name){
        this.firstname = name;
    }

    getLastName(){
        return this.lastname;
    }

    setLastName(name){
        this.lastname = name;
    }

    getDateNaiss(){
        return this.date_naiss;
    }

    setDateNaiss(date){
        this.date_naiss = date;
    }

    getLieuNaiss(){
        return this.lieu_naiss;
    }

    setLieuNaiss(lieu){
        this.lieu_naiss = lieu;
    }

    convertToJSON(){
        return JSON.stringify(this);
    }
}

module.exports = Prisoner;