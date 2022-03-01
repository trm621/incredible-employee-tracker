const inquirer = require('inquirer');
const db = require('./db/connection.js');

function startApp() {
    console.log("Hello there! Choose from the list of options below.");
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
                        console.table(rows);
                    }
                    goBack();
                });
                break;
            case "View all roles":
                sql = `SELECT roles.id, roles.title, roles.salary, departments.name
                AS department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log("An error occurred.")
                    } else {
                        console.log("Roles:");
                        console.table(rows);
                    }
                    goBack();
                });
                break;
            case "View all employees":  
                sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, manager_id AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id`;
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log("An error occurred.")
                    } else {
                        console.log("Employees:");
                        console.table(rows)
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
                                console.log('Must enter department name.');
                                return false;
                            }
                        }
                    }
                ])
            .then(data => {
                sql = `INSERT INTO departments (name) VALUES (?)`;
                params = [data.department];
                db.query(sql, params, (err, rows) => {
                    if (err) {
                        console.log('An error occurred. Please input correct information.')
                    } else {
                        console.log('Department added!');
                    }
                    goBack();
                })
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
            case "Add an employee":
                inquirer.prompt([
                        {
                            type: 'text',
                            name: 'firstName',
                            message: "Enter the employee's first name.",
                            validate: firstNameInput => {
                                if (firstNameInput) {
                                    return true;
                                } else {
                                    console.log("An error occurred. Please enter the employee's first name.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'text',
                            name: 'lastName',
                            message: "Enter the employee's last name.",
                            validate: lastNameInput => {
                                if (lastNameInput) {
                                    return true;
                                } else {
                                    console.log("An error occurred. Please enter the employee's last name.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'number',
                            name: 'roleId',
                            message: "Please enter the employee's role ID.",
                            validate: roleIdInput => {
                                if (roleIdInput) {
                                    return true;
                                } else {
                                    console.log("An error occurred. Please enter the employee's role ID!");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'number',
                            name: 'managerId',
                            message: "If this employee has a manager, please enter the manager ID. ",
                        }
                    ])
                    .then(data => {
                        if (Number.isInteger(data.managerId)) {
                            sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                            params = [data.firstName, data.lastName, data.roleId, data.managerId];
                        } else {
                            data.managerId = null;
                            sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                            params = [data.firstName, data.lastName, data.roleId, data.managerId];
                        }
                        db.query(sql,params, (err, rows) => {
                            if (err) {
                                console.log("An error occurred. Please enter correct credentials!");
                            } else {
                                console.log("New employee added!");
                            }
                            goBack();
                        });
                    });
                break;
                case "Update an existing employee's role":
                    inquirer.prompt([
                        {
                            type: "number",
                            name: "employeeId",
                            message: "Enter the ID number of the employee you'd like to update.",
                            validate: employeeIdInput => {
                                if (employeeIdInput) {
                                    return true;
                                } else {
                                    console.log("An error occurred. Please enter the ID number of the employee you'd like to update.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: "number",
                            name: "newRole",
                            message: "Enter the role ID for the employee's new position.",
                            validate: newRoleInput => {
                                if (newRoleInput) {
                                    return true;
                                } else {
                                    console.log("An error occurred. Please enter the role ID for the employee's new position.");
                                    return false;
                                }
                            }
                        }
                    ])
                    .then(data => {
                        sql = `UPDATE employees SET role_id = ?
                        WHERE id =?`;
                        params = [data.newRole, data.employeeId];
                        db.query(sql, params, (err, rows) => {
                            if (err) {
                                console.log("An error occurred. Please enter correct credentials.");
                            } else {
                                console.log("Employee's role updated!");
                            }
                            goBack();
                        });
                    });
                break;
            default:
                console.log("An unknown error occurred. Please enter correct credentials.");
                break;
        }
    })
};

function goBack() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "goBack",
            message: "Go back to main menu?",
            default: false
        }
    ])
    .then(data => {
        if (data.goBack) {
            startApp();
        } else {
            console.log("Exit out of window to end. Thank you!")
        }
    });
}


startApp();