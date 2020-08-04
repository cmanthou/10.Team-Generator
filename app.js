const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { fileURLToPath } = require("url");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let teamMembers = [];
var firstQuestion = {
    type: "list",
    message: "Add a team memeber or generate a new team?",
    name: "Add",
    choices: ["Add Member", "Generate Team"],
};
var questionsYourRole = {
    type: "list",
    message: "What role would you like to add?",
    name: "role",
    choices: ["Intern", "Engineer", "Manager"],
};
var fileNameQuestion = {
    type: "input",
    message: "Please enter file name",
    name: "fileName",
};
var Questions = {
    Manager: [
        {
            type: "input",
            message: "Please enter your Name",
            name: "name",
        },
        {
            type: "input",
            message: "What is your ID Number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your Email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your Office Number?",
            name: "officeNumber",
        },
    ],
    Engineer: [
        {
            type: "input",
            message: "Please enter your Name",
            name: "name",
        },
        {
            type: "input",
            message: "What is your ID Number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your Email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your GitHub User Name?",
            name: "githubUserName",
        },
    ],
    Intern: [
        {
            type: "input",
            message: "Please enter your Name",
            name: "name",
        },
        {
            type: "input",
            message: "What is your ID Number?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your Email?",
            name: "email",
        },
        {
            type: "input",
            message: "Which school do you attend?",
            name: "school",
        },
    ],
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

var startApp = () => {
    selectRole();
};
var addOrFinish = () => {
    inquirer.prompt(firstQuestion).then((answer) => {
        if (answer.Add === "Add Member") {
            selectRole();
        } else {
            getFileName();
        }
    });
};
var selectRole = () => {
    inquirer.prompt(questionsYourRole).then((answer) => {
        console.log(answer);
        roleQuestions(Questions[answer.role], answer.role);
    });
};
var roleQuestions = (questions, role) => {
    inquirer.prompt(questions).then((answer) => {
        console.log(answer);
        let member = {};
        if (role === "Manager") {
            member = new Manager(
                answer.name,
                answer.id,
                answer.email,
                answer.number
            );
        } else if (role === "Engineer") {
            member = new Engineer(
                answer.name,
                answer.id,
                answer.email,
                answer.gitHub,
            );
        } else if (role === "Intern") {
            member = new Intern(
                answer.name, 
                answer.id, 
                answer.email, 
                answer.school,
            );
        }
        teamMembers.push(member);
        addOrFinish();
    });
};
var getFileName = () => {
    inquirer.prompt(fileNameQuestion).then((answer) => {
        if (answer.fileName) {
            generateTeam(answer.fileName);
        } else {
            getFileName();
        }
    });
};
var generateTeam = (fileName) => {
    var outputPath = path.join(OUTPUT_DIR, fileName + ".html");

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), (err) => {
        if (err) {
            getFileName();
        }
    });
};

startApp();


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
