const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const res = require('express/lib/response');


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
