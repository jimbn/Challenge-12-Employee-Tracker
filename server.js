const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const res = require('express/lib/response');
const Connection = require('mysql2/typings/mysql/lib/Connection');


// First question prompting option
const initialQuestion = () => {
    inquirer.prompt ([
        {
            type:'list',
            name:'initialQuestion',
            message: 'Please select an option.',
            choices:[
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((answer) => {
        switch(answer.initialQuestion){
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                UpdateEmployeeRole();
                break;
        }
    });
};

// view all Department
const viewAllDepartments = () => {
    const sql = `Select * FROM department`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Viewing Departments');
        console.table(res);
        initialQuestion();
    })
};

// view all roles
const viewAllRoles = () => {
    const sql = `SELECT * FROM role`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Viewing Roles');
        console.table(res);
        initialQuestion();
        return;
    })
};

// view all employee
const viewAllEmployees = () => {
    const sql = `SELECT * FROM employees`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Viewing Roles');
        console.table(res);
        initialQuestion();
        return;
    })
};

// add department: include validation of value
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name:'dept'
        }
    ]) .then((answers) => {
        db.query(`INSERT INTO department(name) VALUES (?)`, 
        [answers.dept], 
        (err) => {
            if (err) throw err;
            console.log('Added new department to database.');
            console.table(answers);
            initialQuestion();
        })
    })
};

//function to add role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What role would you like to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'what is the salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message:'What is the department`s id number?',
            name: 'roleDept'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`, 
        [answers.role, answers.salary, answers.roleDept], 
        (err) => {
            if(err) throw err;
            console.log('Added new role database.');
            console.table(answers);
            initialQuestion();
        })
    })
};

//function to add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the role id of the employee?',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'What is the manager id of the employee?',
            name: 'managerId'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
        [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
        (err) => {
            if(err) throw err;
            console.log('Added new employee');
            initialQuestion();
        })
    })
};