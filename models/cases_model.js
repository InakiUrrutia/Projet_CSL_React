class Case{
    constructor(case_name, case_date, juridiction, prisoner){
       this.case_name = case_name;
       this.case_date = case_date;
       this.juridiction = juridiction;
       this.prisoner = prisoner; 
    }

    getCaseName = () => {
        return this.case_name;
    }

    setCaseName = (cn) => {
        this.case_name = cn;
    }

    getCaseDate = () => {
        return this.case_date;
    }
    
    setCaseDate = (cd) => {
        this.case_date = cd;
    }

    getJuridiction = () => {
        return this.juridiction;
    }
    
    setJuridiction = (jur) => {
        this.juridiction = jur;
    }

    getPrisoner = () => {
        return this.prisoner;
    }
    
    setPrisoner = (p) => {
        this.prisoner = p;
    }
}

module.exports = Case;