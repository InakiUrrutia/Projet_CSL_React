class Prisoner{
    constructor(num, firstname, lastname, date_naiss, lieu_naiss, motive, date_dec, duree_dec){
        this.num = num;
        this.firstname = firstname;
        this.lastname = lastname;
        this.date_naiss = date_naiss;
        this.lieu_naiss = lieu_naiss;
        this.motive = motive;
        this.date_dec = date_dec;
        this.duree_dec = duree_dec;
    }

    getNum = () => {
        return this.num;
    }

    setNum = (n) => {
        this.num = n;
    }

    getFirstName = () => {
        return this.firstname;
    }

    setFirstName = (name) => {
        this.firstname = name;
    }

    getLastName = () => {
        return this.lastname;
    }

    setLastName = (name) => {
        this.lastname = name;
    }

    getDateNaiss = () => {
        return this.date_naiss;
    }

    setDateNaiss = (date) => {
        this.date_naiss = date;
    }

    getLieuNaiss = () => {
        return this.lieu_naiss;
    }

    setLieuNaiss = (lieu) => {
        this.lieu_naiss = lieu;
    }

    getMotive = () => {
        return this.motive;
    }

    setMotive = (motive) => {
        this.motive = motive;
    }

    getDateDec = () => {
        return this.date_dec;
    }
    
    setDateDec = (date) => {
        this.date_dec = date
    }

    getDureeDec = () => {
        return this.duree_dec;
    }

    setDureeDec = (duree) => {
        this.duree_dec = duree;
    }
}

module.exports = Prisoner;