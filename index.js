const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'begin',
            message: 'What would you like to do?',
            choices: ['View all departments', 
            'View all roles',
            "View all employees",
            "Add a new department",
            "Add a role",
            "Add an employee",
            "Update an existing employee's role"]
        }
    ])
    .then(data => {
        switch(data.begin) {
            case "View all departments":
                viewAllDepartments();
            break;
            case "View all roles":
                viewAllRoles();;
            break;
            case "View all employees":
                viewAllEmployees();
            break;
            case "Add a new department":
                addNewDepartment();
            break;
            case "Add a role":
                addNewRole();
            break;
            case "Add an employee":
                addNewEmployee();
            break;
            case "Update an existing employee's role":
                updateRole();
            break;
        }
    })
    
};

function viewAllDepartments() {
    let sql;
    sql = 'SELECT * FROM departments';
    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Error. Please try again.")
        }
        else {
            console.table(rows)
        }
    })

}

function viewAllRoles() {

}

function viewAllEmployees() {

}

function addNewRole() {

}

function addNewEmployee() {
    if(!employeeData) {
        employeeData = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role?"
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager?"
        }
    ])
    .then(employeeInfo => {
        employeeData.push(employeeInfo)
        return employeeInfo;
    })
};

function updateRole() {

}

init();