INSERT INTO department
    (name)
VALUES
    ('Sales Rep'),
    ('Data Analyics'),
    ('Customer Relations'),
    ('Engineers'),
    ('Human Resource');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Manager', 1000.00, 0),
    ('Manager', 1000.00, 1),
    ('Manager', 1000.00, 2),
    ('Manager', 1000.00, 3),
    ('Manager', 1000.00, 4),
    ('Engineer 1', 900.00, 3),
    ('Engineer 2', 900.00, 3),
    ('Sales', 600.00, 0),
    ('Analysts', 800.00, 1),
    ('Customer Service ', 600.00, 2),
    ('Human Resource', 650.00, 4),

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Kenley', 'Carroll', 0),
    ('Mylee', 'Le', 1),
    ('Nancy', 'Reese', 2),
    ('Larissa', 'Bush', 3),
    ('Caleb', 'Meadows', 4),
    ('Deavan', 'Dudley', 5, 3),
    ('Julien', 'Little', 6, 3),
    ('America', 'Bishop', 7, 0),
    ('John', 'Vincent', 8, 1),
    ('Myah', 'Hansen', 9, 2),
    ('Leandro', 'Chen', 10, 4);

    