const express = require('express');
const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');
let rolesArray = [];

const PORT = process.envPORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username,
    user: 'root',
    //MySQL password
    password: 'password',
    database: 'tracker'
  });



db.connect((err) => {
    if (err) throw err;
    console.log('You are connected to the database');
    app.listen(PORT, () => {
        console.log(`You are now on port ${PORT}`);
    });
    initialQuestion();
});


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
                updateEmployeeRole();
                break;
            case 'Exit':
                exit();
                break;
        }
    });
};

// view all Department
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`
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
    rolesArray = []
    const sql = `SELECT * FROM role`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        res.forEach(({ title }) => {
            rolesArray.push(title);
        })
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
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
        [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
        (err) => {
            if(err) throw err;
            console.log('Added new employee');
            initialQuestion();
        })
    })
};

//function to update employee's role
const updateEmployeeRole = () => {
    const sql = `SELECT * FROM employees;`
    db.query(sql,(err,res) => {
        if (err) throw err;
        console.table(res);
        console.table(rolesArray);
    })
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee ID of the employee you want to update.',
            name: 'updateEmployee',
        },
        {
            type: 'input',
            message: 'Enter the id of the role you want to update the employee`s role to.',
            name: 'updatedEmployeeRole'
        }
    ]).then((answers) => {
        db.query(`UPDATE employees SET role_id = (?) WHERE id = (?)`, 
        [answers.updatedEmployeeRole, answers.updateEmployee],
        (err) => {
            if(err) throw err;
            console.log('Added new employee');
            initialQuestion();
        })
    })
}

const exit = () => {
    console.log('Leaving Employee Tracker.');
    db.end();
    process.exit();

};


