const path = require('path');
const fs = require('fs');

function insertValue (template, valueName, value) {
    let regEx = new RegExp (`{{${valueName}}}`, 'g');
    return template.replace(regEx, value);
}

function render (teamMembers) {
    let outputHtml = '';
    for (let member of teamMembers){
        const outputPath = path.resolve(__dirname, "../src", `${member.getRole().toLowerCase()}.html`);
        let data = fs.readFileSync(outputPath, 'utf-8');
        data = insertValue(data, 'name', member.getName());
        data = insertValue(data, 'role', member.getRole());
        data = insertValue(data, 'id', member.getId());
        data = insertValue(data, 'email', member.getEmail());

        switch(member.getRole()){
            case 'Engineer':
                data = insertValue(data, 'github', member.getGithub());
                break;
            case 'Intern':
                data = insertValue(data, 'school', member.getSchool());
                break;
            case 'Manager':
                data = insertValue(data, 'officeNumber', member.getOfficeNumber());
                break;
            default:
                break;
        }
        outputHtml += data;
    }

    const srcPath = path.resolve(__dirname, "../src/main.html" );
    let mainData = fs.readFileSync(srcPath, "utf-8");

    return insertValue(mainData, 'team', outputHtml);
}

module.exports = render;