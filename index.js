const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Employee = require('./lib/employee');

const html = require('./lib/html')

const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs');


const outputPath = path.resolve(__dirname, "output", 'team.html');

// const teamMembers = [];

const githubPrompt = {
    type: 'input',
    name: 'githubAccount',
    message: 'Enter your github account name to link your account. (Required)',
}

const officeNumberPrompt = {
    type: 'input',
    name: 'officeNumber',
    message: 'What is your office number?'
}

const schoolPrompt = {
    type: 'input',
    name: 'schoolName',
    message: 'Which school are you currently attending?'
}

class newTeamMember {
    teamMembers = [];
    employeePrompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is your first name? (Required)',
                validate: requiredInput => {
                    if (requiredInput) {
                        return true;
                    } else {
                        console.log('You need to enter a name.');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is your role with your team? (Required)',
                choices: ['Manager', 'Engineer', 'Intern']
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your ID number?',
                validate: requiredInput => {
                    if (typeof requiredInput !== 'number') {
                        console.log('You need to input a number.');
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter your email address. (Required)',
                validate: requiredInput => {
                    if (requiredInput) {
                        return true;
                    } else {
                        console.log('You need to include an email.')
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Please enter your Github username:',
                when (answers) {
                    return answers.role === 'Engineer'
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'Please enter the name of your school',
                when (answers) {
                    return answers.role === 'Intern'
                }
            },
            {
                type: 'list',
                name: 'nextStep',
                message: 'What would you like to do next?',
                choices: ['Add another team member', 'Finish']
            }
    ]

    addNewMember() {
        console.log('New team member:');
        console.log('-------');
        inquirer.prompt(this.employeePrompts)
            .then(answers => {
                if (answers.role === 'Intern') {
                    const intern = new Intern (answers.name, answers.id, answers.email, answers.school);
                    this.teamMembers.push(intern);
                } 
                else if (answers.role === 'Engineer') {
                        const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github);
                        this.teamMembers.push(engineer);
                    }
                

                if (answers.nextStep === 'Add another team member') {
                    this.addNewMember();
                } else {
                    this.generateProfile();
                }
            })
    }

    addManager() {
        console.log('About your manager:');
        console.log('-------');
        inquirer.prompt(this.employeePrompts, {role: 'Manager'})
            .then(answers => {
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                this.teamMembers.push(manager);
                if (answers.nextStep === 'Add another team member') {
                    this.addNewMember();
                } else {
                    this.html();
                }
            })
    }

    generateProfile() {
        const pageHtml = html(this.teamMembers);
        fs.writeFileSync('./dist/index.html', pageHtml);
        fs.copyFileSync('./src/style.css', './dist/style.css');
        console.log('Nice, your team roster is up.');
    }
};

// questions()
//     .then(answers => {
//         const employeePage = html(answers);
//         // console.log(responses);
//         fs.writeFile('./dist/main.html', employeePage, err => {
//             if (err) throw err;
//             console.log('Employee page created, sir. Open main.html to see it.');
//         });
//         }
//     );

module.exports = newTeamMember;
