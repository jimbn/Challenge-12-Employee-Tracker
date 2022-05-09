INSERT INTO department
    (name)
VALUES
    ('Department 1'),
    ('Department 2'),
    ('Department 3'),
    ('Department 4'),
    ('Department 5');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('manager', 1234.56, 1),
    ('manager', 1234.78, 2),
    ('manager', 1234.90, 3),
    ('engineer S', 999.00, 0),
    ('engineer S', 999.00, 1),
    ('engineer S', 999.00, 2),
    ('engineer S', 999.00, 3),
    ('engineer S', 999.00, 4),
    ('engineer J', 777.99, 0),
    ('engineer J', 777.99, 1),
    ('engineer J', 777.99, 2),
    ('engineer J', 777.99, 3),
    ('engineer J', 777.99, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('First1', 'Last1', 1, 2),
    ('First2', 'Last2', 0, 4);

    