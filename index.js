const inquirer = require('inquirer');

const createEmployee = employeeData => {
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
}