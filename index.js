const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

function init() {
    console.log("Hello there!");
    inquirer.prompt([
        {
            type: 'list',
            name: 'begin',
            message: 'What would you like to do?',
            choices: [ 
                new inquirer.Separator(), "View all departments", 
                new inquirer.Separator(), "View all roles",
                new inquirer.Separator(), "View all employees",
                new inquirer.Separator(), "Add a department",
                new inquirer.Separator(), "Add a role",
                new inquirer.Separator(), "Add an employee",
                new inquirer.Separator(), "Update an existing employee's role"
    ]
        }
    ])
    .then(data => {
        let sql;
        let params;
        switch(data.begin) {
    case "View all departments":
        sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("An error occurred.")
            } else {
                console.log("Departments:");
                console.log(rows);
            }
            goBack();
        });
        break;
    case "View all roles":
        sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("An error occurred.")
            } else {
                console.log("Roles:");
                console.log(rows);
            }
            goBack();
        })
        break;
    case "View all employees":  
        sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log("An error occurred.")
            } else {
                console.log("Employees:");
                console.log(rows)
            }
            goBack();
        });
        break;
    case "Add a department":
        inquirer.prompt([
            {
                type: 'text',
                name: 'department',
                message: "Please enter the name of the department you'd like to add.",
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Must enter department name.')
                        return false;
                    }
                }
            }
        ])
    .then(data => {
        sql = `INSERT INTO departments (name) VALUES (?)`;
        params = [data.departments];
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log('An error occurred. Please input correct information.')
            } else {
                console.log('Department added!');
            }
            goBack();
        })
        break;
    case "Add a role":
        inquirer.prompt([
            {
                type: 'text',
                name: "role",
                message: "Please enter the title of the role you'd like to add.",
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log("An error occurred. Please enter the title of the role you'd like to add.");
                        return false
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message: "Please enter the base salary for the role you've added.",
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log("An error occurred. Please enter the base salary for the role you've added.");
                        return false
                    }
                }
            },
            {
                type: 'number',
                name: "departmentId",
                message: "Please enter the department ID for this role.",
                validate: departmentIdInput => {
                    if (departmentIdInput) {
                        return true;
                    } else {
                        console.log("An error occurred. Please enter the department ID for this role.");
                        return false;
                    }
                }
            }
        ])
        .then(data => {
            sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            params = [data.role, data.salary, data.departmentId];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log("An error occurred. Taking you back to the main menu.")
                } else {
                    console.log("Role added!")
                }
                goBack();
            })
        })
        break;
    })
};
}
})


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