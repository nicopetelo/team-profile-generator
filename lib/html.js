// const path = require("path");
// const fs = require("fs");

function renderEmployees(teamMembers) {
  let cards = "";
  let roleIcon = "";
  for (let i = 0; i < teamMembers.length; i++) {
    let other;
    let otherIcon;
    switch (teamMembers[i].role) {
      case "Manager":
        roleIcon = '<i class="fas fa-star role-icon"></i>';
        other = `#${teamMembers[i].officeNumber}`;
        otherIcon = '<i class="fas fa-door-closed"></i>';
        otherType = "office number";
        break;
      case "Engineer":
        roleIcon = '<i class="fas fa-laptop-code role-icon"></i>';
        other = `<a href="https://github.com/${teamMembers[i].github}" target="_blank">${teamMembers[i].github}</a>`;
        otherIcon = '<i class="fab fa-github"></i>';
        otherType = "github profile";
        break;
      case "Intern":
        roleIcon = '<i class="fas fa-graduation-cap role-icon"></i>';
        other = `${teamMembers[i].school}`;
        otherIcon = '<i class="fas fa-school"></i>';
        otherType = "school";
        break;
    }
    cards += `
            <div class="card my-4 mx-auto">
              <div class="card-body">
                ${roleIcon}
                <h4 class="card-title">${teamMembers[i].name}</h4>
                <p class="card-text">${teamMembers[i].role}</p>
              </div>
              <div class="details">
                <div>
                  <div class="detail-icon"><i title="ID number" class="fas fa-id-badge"></i></div>
                  <div>${teamMembers[i].id}</div>
                </div>
                <div>
                  <div class="detail-icon"><i title="email" class="fas fa-at"></i></div>
                  <div><a href="mailto:${teamMembers[i].email}" target="_blank">${teamMembers[i].email}</a></div>
                </div>
                <div>
                  <div class="detail-icon" title="${otherType}">${otherIcon}</div>
                  <div>${other}</div>
                </div>
              </div>
            </div>\n`;
  }
  return cards;
}

function renderPage(teamMembers) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossorigin="anonymous"
/>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri&display=swap">
<link rel="stylesheet" href="./style.css" />
<title>Our Team</title>
</head>
<body>
<header class="jumbotron">
    <h1 class="display-3">Our Team</h1>
</header>
<div class="container">
    <div class="row">
    <div class="col mx-auto">
        <div class="row">
        <div class="col-12 cards">
            ${renderEmployees(teamMembers)}
        </div>
        </div>
    </div>
    </div>
</div>  
</body>
</html>
`;
}

module.exports = renderPage;

// 
// 

// function insertValue(template, valueName, value) {
//     let regEx = new RegExp(`{{${valueName}}}`, "g");
//     return template.replace(regEx, value);
// }
//     let outputHtml = '';
//     for (let member of teamMembers){
//         const outputPath = path.resolve(__dirname, "../src", `${member.getRole().toLowerCase()}.html`);
//         let data = fs.readFileSync(outputPath, 'utf-8');
//         data = insertValue(data, 'name', member.getName());
//         data = insertValue(data, 'role', member.getRole());
//         data = insertValue(data, 'id', member.getId());
//         data = insertValue(data, 'email', member.getEmail());

//         switch(member.getRole()){
//             case 'Engineer':
//                 data = insertValue(data, 'github', member.getGithub());
//                 break;
//             case 'Intern':
//                 data = insertValue(data, 'school', member.getSchool());
//                 break;
//             case 'Manager':
//                 data = insertValue(data, 'officeNumber', member.getOfficeNumber());
//                 break;
//             default:
//                 break;
//         }
//         outputHtml += data;
//     }

//     const srcPath = path.resolve(__dirname, "../src/main.html" );
//     let mainData = fs.readFileSync(srcPath, "utf-8");

//     return insertValue(mainData, 'team', outputHtml);
// }

// module.exports = render;
