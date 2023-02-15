const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./config/connection')

// Starting point for user questions
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
     if (answers.directory == "View all departments"){
        viewAllDepartments()
     }
     else if (answers.directory == "View all roles"){
        viewAllRoles()
     }
     else if (answers.directory == "View all employees"){
        viewAllEmployees()
     }
     else if (answers.directory == "Add a department"){
        addDepartmentPrompt()
     }
     else if (answers.directory == "Add a role"){
        addRolePrompt()
     }
     else if (answers.directory == "Add a employee"){
        addEmployeePrompt()
     }
     else if (answers.directory == "End"){
        console.log('Enjoy your day!')
        process.exit()
     }
}

// Views for the three view prompts, every option links back to start point for reusability 
const viewAllDepartments = async() => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            cTable(result);
        }
    });
    initialPrompt()
}

const viewAllRoles = async() => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            cTable(result);
        }
    });
    initialPrompt()
} 

const viewAllEmployees = async() => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            cTable(result);
        }
    });
    initialPrompt()
} 

// Adding departments prompt calling the linked function which adds it to the table
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

// Adding role prompts calling the linked function which adds it to the table
const addRolePrompt = async () => {
    const answers = await inquirer
    .prompt([ 
        {
            type: "input",
            message: "What's the role title?",
            name:  "roleTitle"
        },
        {
            type: "input",
            message: "What's the salary for this role?",
            name:  "roleSalary"
        },
        {
            type: "input",
            message: "What department is this role in?",
            name:  "roleDepartment"
        }
    ])
    console.log(answers)
    addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
    initialPrompt()
}

const addRole = async(roleTitle, roleSalary, roleDepartment) => {
    const sql = `INSERT INTO role (title, salary, department)
    VALUES (?)`;
    const params = [roleTitle, roleSalary, roleDepartment]

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

// Adding employee prompts calling the linked function which adds it to the table
const addEmployeePrompt = async () => {
    const answers = await inquirer
    .prompt([ 
        {
            type: "input",
            message: "What's the employees first name?",
            name:  "firstName"
        },
        {
            type: "input",
            message: "What's the employees last name?",
            name:  "lastName"
        },
        {
            type: "input",
            message: "What's the employees role?",
            name:  "employeeRole"
        },
        {
            type: "input",
            message: "Who's the employees manager?",
            name:  "employeeManager"
        }
    ])
    console.log(answers)
    addEmployee(answers.firstName, answers.lastName, answers.employeeRole, answers.employeeManager)
    initialPrompt()
}

const addEmployee = async(firstName, lastName, employeeRole, employeeManager) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?)`;
    const params = [firstName, lastName, employeeRole, employeeManager]

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

// 
// const updateEmployeePrompt = async () => {
//     const answers = await inquirer
//     .prompt([ 
//         {
//             type: "input",
//             message: "What's the department?",
//             name:  "firstName"
//         }
//     ])
//     console.log(answers)
//     addEmployee(answers.firstName)
//     initialPrompt()
// }

// const updateEmployee = async(firstName) => {
//     const sql = `INSERT INTO employee (name)
//     VALUES (?)`;
//     const params = [firstName]

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             console.log(err);
//         } else if (!result.affectedRows) {
//             console.log('No affected rows!')
//         } else {
//             console.log(result);
//         }
//     });
// }


initialPrompt();