//A menu driven app that allows for creating political parties, 
//candidates for office, and the office for which they are running.

class Candidate {       //create candidate that holds possition and describe candidate
    constructor(name, office){
        this.name = name;
        this.office = office;
    }
    describe(){         //print out info about candidate
        return `${this.name} is running for ${this.office}.`;
    }
}

class Party{
    constructor(name){          //each new party creates array to hold candidates.
        this.name = name;
        this.candidates =[];            //new candidates array.
    }
    addCandidate(candidate){
        if (candidate instanceof Candidate){           //check to see if cand is mem of Cand class
            this.candidates.push(candidate);
        }else{                  //throw exception or error passes arg
            throw new Error(`You may only add a Candidate's name. 
            Argument is not a candidate's name: ${candidate}`);
        }
    }

    describe(){             //for Party class
        return `${this.name} Party currently has  ${this.candidates.length} 
        candidates running for office.`;
    }
}

class Menu{     // this class drives the app
    constructor(){
        this.parties = [];              //init party and include array
        this.selectedParty = null;      //var for what team selected//nor teams selected at start
    }
//start using methods that don't yet exist to build what will look like, then implement meth; top down
    start (){
        let selection = this.showMainMenuOptions();     //returns selection that user gives
        while (selection != 0){
            switch (selection){         //selection is var to get user input
                case '1':
                    this.createParty();     //place holder to implement later in time
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
                default:                //catch anything else
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Thank you.');        //if user selects 0, then while becomes false
    }
//allow user to make selections
    showMainMenuOptions(){          //return from prompt popup box next line
        return prompt(`
            0) exit
            1) create new party
            2) view party
            3) delete party
            4) display all parties
        `)
    }

    showPartyMenuOptions(partyInfo){        //takes info, returns prompt
        return prompt(`
            0) back
            1) create candidate
            2) delete candidate
            ------------------------

            ${partyInfo}
        `);
    }
//implement menu options
    displayParties(){
        let partyString = ' ';  //build string w/ info in it to display in prompt
        for (let i = 0; i < this.parties.length; i++){  //iterating thru each party
            partyString += i + ') ' + this.parties[i].name + '\n'; //concat party info
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
        let name = prompt('Enter name for new party: ');    //takes one parameter (name)
        this.parties.push(new Party(name)); //create new instance of a class to push to Party array
    }       //this.parties is the array where all parties are kept

    viewParty(){        //see details of party instance
        let index =prompt('Enter the index of the party to be viewed:');
        if (index > -1 && index < this.parties.length){     //validation to avoid errors
            this.selectedParty = this.parties[index]; //set selectedTeam from class Menu to user input
            let description = 'Party Name: ' + this.selectedParty.name + '\n'; //for team to print out
//build list add description of candidates to party     //iterates thru list (.length)
            for (let i=0; i < this.selectedParty.candidates.length; i++){ //each party has array (candi)
                description += i + ') ' + this.selectedParty.candidates[i].name 
                + '- is running for ' + this.selectedParty.candidates[i].office + '\n';
            }
            let selection = this.showPartyMenuOptions(description); //top down approach
            switch(selection){
                case '1':
                    this.createCandidate(); //more methods to create
                    break;
                case '2':
                    this.deleteCandidate(); //more methods to create
            }
        }
    }
    createCandidate(){      //new method
        let name = prompt('enter name of new candidate: ');
        let office = prompt('Enter office for new candidate: ' );
        this.selectedParty.candidates.push(new Candidate(name, office));
//selectedParty var tells us what party is selected
//takes name of candidate, creates instance of candidate & pushes to party selected.
    }

    deleteCandidate(){
        let index = prompt('Enter the index of the candidate you wish to delete:');
        if (index > -1 && index < this.selectedParty.candidates.length){
            this.selectedParty.candidates.splice(index, 1); //remove one element
        }
    }

}
let menu = new Menu();      //must create instance of menu
menu.start();               //start method shows everything