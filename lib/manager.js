const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email)
        this.officeNumber = officeNumber;
    }

    officeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return 'Manager';
    }

}

async function hello () { console.log('hello')};
hello();

module.exports = Manager;