class Candidate {
    constructor(name, office){
        this.name = name;
        this.office = office;
    }
    describe(){
        return `${this.name} is running for ${this.office}.`;
    }
}

class Party{
    constructor(name){
        this.name = name;
        this.candidates =[];
    }
    addCandidate(candidate){
        if (candidate instanceof Candidate){
            this.candidates.push(candidate);
        }else{
            throw new Error(`You may only add a Candidate's name. 
            Argument is not a candidate's name: ${candidate}`);
        }
    }

    describe(){
        return `${this.name} Party currently has  ${this.candidates.length} candidates running.`;
    }
}

class Menu{     // this class drives the app
    constructor(){
        this.parties = [];
        this.selectedParty = null;
    }
    start (){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createParty();
                    break;
                case '2':
                    this.viewParty();
                    break;
                case '3':
                    this.deleteParty();
                    break;
                case '4':
                    this.displayParties();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    showMainMenuOptions(){
        return prompt(`
            0) exit
            1) create new party
            2) view party
            3) delete party
            4) display all parties
        `)
    }

    showPartyMenuOptions(partyInfo){
        return prompt(`
            0) back
            1) create candidate
            2) delete candidate
            ------------------------

            ${partyInfo}
        `);
    }

    displayParties(){
        let partyString = ' ';
        for (let i = 0; i < this.parties.length; i++){
            partyString += i + ') ' + this.parties[i].name + '\n';
        }
        alert(partyString);  //can see all parties
    }

    deleteParty(){
        let index = prompt('Enter the index of the party that you want to delete:');
        if(index > -1 && index < this.parties.length){
            this.parties.splice(index, 1);
        }
    }
    
    createParty(){
        let name = prompt('Enter name for new party: ');
        this.parties.push(new Party(name)); //create new instance of a class to push to Party array
    }

    viewParty(){
        let index =prompt('Enter the index of the party to be viewed:');
        if (index > -1 && index < this.parties.length){
            this.selectedParty = this.parties[index];
            let description = 'Party Name: ' + this.selectedParty.name + '\n';
            for (let i=0; i < this.selectedParty.candidates.length; i++){
                description += i + ') ' + this.selectedParty.candidates[i].name 
                + '- ' + this.selectedParty.candidates[i].office + '\n';
            }
            let selection = this.showPartyMenuOptions(description);
            switch(selection){
                case '1':
                    this.createCandidate();
                    break;
                case '2':
                    this.deleteCandidate();
            }
        }
    }
    createCandidate(){
        let name = prompt('enter name of new candidate: ');
        let office = prompt('Enter office for new candidate: ' );
        this.selectedParty.candidates.push(new Candidate(name, office));
    }

    deleteCandidate(){
        let index = prompt('Enter the index of the candidate you wish to delete:');
        if (index > -1 && index < this.selectedParty.candidates.length){
            this.selectedParty.candidates.splice(index, 1);
        }
    }

}
let menu = new Menu();
menu.start();