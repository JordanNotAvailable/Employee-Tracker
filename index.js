const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./config/connection')

const initialPrompt = async () => {
    const answers = await inquirer
    .prompt([
        {
            type: "list",
            message: "What do you want to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employees role",
                "End"
            ],
            name: 'directory',
            loop : false
        }
    ])
    console.log(answers)
     if (answers.directory == "Add a department"){
        addDepartmentPrompt()
     }
     else if (answers.directory == "View all departments"){
        viewAllDepartments()
     }
     else if (answers.directory == "End"){
        console.log('Enjoy your day!')
        process.exit()
     }  
}

 
const addDepartmentPrompt = async () => {
    const answers = await inquirer
    .prompt([ 
        {
            type: "input",
            message: "What's the department?",
            name:  "departmentName"
        }
    ])
    console.log(answers)
    addDepartment(answers.departmentName)
    initialPrompt()

}
const viewAllDepartments = async() => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
        }
    });
    initialPrompt()
}

const addDepartment = async(departmentName) => {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = [departmentName]

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        } else if (!result.affectedRows) {
            console.log('No affected rows!')
        } else {
            console.log(result);
        }
    });
}


initialPrompt()