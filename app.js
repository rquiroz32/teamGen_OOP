const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require('./lib/htmlRenderer')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


let employees = []

const managerQuestions = [
    {
        type: 'input',
        name: 'Name',
        message: "What is the name of your Team's Manager you'd like to create?"
    },
    {
        type: 'input',
        name: 'Id',
        message: "What is the id of your Team's Manager?"
    },
    {
        type: 'input',
        name: 'Email',
        message: "What is the email of your Team's Manager?"
    },
    {
        type: 'input',
        name: 'OfficeNumber',
        message: "What is the office number of the Manager you'd like to create?"
    },
    {
        type: 'list',
        name: 'Role',
        message: "What role would you like your Employee to have?",
        choices: ["Manager"]
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'Name',
        message: "What is the name of the Engineer you'd like to create?"
    },
    {
        type: 'input',
        name: 'Id',
        message: "What is the id of the Engineer?"
    },
    {
        type: 'input',
        name: 'Email',
        message: "What is the email of the Engineer?"
    },
    {
        type: 'input',
        name: "GitHub",
        message: "What is the GitHub Account Name of the Engineer you'd like to create?"
    },
    {
        type: 'list',
        name: 'Role',
        message: "What role would you like your Employee to have?",
        choices: ["Engineer"]
    }

]

const internQuestions = [
    {
        type: 'input',
        name: 'Name',
        message: "What is the name of the Intern you'd like to create?"
    },
    {
        type: 'input',
        name: 'Id',
        message: "What is the id of the Intern?"
    },
    {
        type: 'input',
        name: 'Email',
        message: "What is the email of the Intern?"
    },
    {
        type: 'input',
        name: 'School',
        message: "What School does the Intern you'd like to create attend?"
    },
    {
        type: 'list',
        name: 'Role',
        message: "What role would you like your Employee to have?",
        choices: ["Intern"]
    }

]

function writeToFile(fileName, data) {
        fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err)
        }
        console.log(`Successfully wrote html`)
    })
}


function askManagerQs() {
    inquirer.prompt(managerQuestions).then((data) => {
        let newManager = new Manager(data.Name, data.Id, data.Email, data.OfficeNumber)
        employees.push(newManager)

        inquirer.prompt(employeeTypeQs).then((data) => {
            routeQuestions(data)
        })
    })
}

function askEngineerQs() {
    inquirer.prompt(engineerQuestions).then((data) => {
        let newEngineer = new Engineer(data.Name,data.Id,data.Email,data.GitHub)
        employees.push(newEngineer)        
        inquirer.prompt(employeeTypeQs).then((data) => {
            routeQuestions(data)
        })
    })
}

function askInternQs() {
    inquirer.prompt(internQuestions).then((data) => {
        let newIntern = new Intern(data.Name,data.Id,data.Email,data.School)
        employees.push(newIntern)        
        inquirer.prompt(employeeTypeQs).then((data) => {
            routeQuestions(data)
        })
    })
}


const initialQuestions = [
    {
        type: "confirm",
        name: "Proceed",
        message: "Welcome to the Team Generator, please enter \'y\' to proceed with creating your team. "

    }

]

const employeeTypeQs = [
    {
        type: "list",
        name: "EmployeeType",
        message: "What type of Employee would you like to create next?",
        choices: ["Manager", "Engineer", "Intern", "None (exit)"]
    }
]

function routeQuestions(data) {
     
    if (data.EmployeeType === 'Engineer') {
        askEngineerQs()
    }
    else if (data.EmployeeType === 'Intern') {
        askInternQs()
    }
    else if (data.EmployeeType === 'Manager') {
        askManagerQs()
    }
    else if (data.EmployeeType === 'None (exit)') {
        
        let HTML = render(employees)  
        console.log(HTML)              
        fs.writeFileSync(outputPath, HTML, err => {
            if (err) {
                console.log(err)
            }
            console.log(`Successfully wrote html`)
        })
        // writeToFile("Team.html", HTML)        
        quit()
    }


}



function quit() {
    
    console.log("Goodbye!");

    process.exit();
}



function init() {
    inquirer.prompt(initialQuestions).then((data) => {
        

        if (data.Proceed === true) {
            askManagerQs()
        } else {
            quit()
        }

    })
}

init();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
