INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00, 2),
    ('Software Engineer', 120000.00, 2),
    ('Account Manager', 160000.00, 3),
    ('Accountant', 125000.00, 3),
    ('Legal Team Lead', 250000.00, 4),
    ('Lawyer', 190000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Walter', 'Sobchak', 1, 2),
    ('Darth', 'Vader', 3, 2),
    ('Luke', 'Skywalker', 5, 3),
    ('Tony', 'Soprano', 6, 3),
    ('Jason', 'Voorhees', 7, null),
    ('Charles', 'Burns', 2, null),
    ('Ash', 'Williams', 4, null),
    ('Jack', 'Torrance', 1, 2),
    ('Xena', 'Warrior-Princess', 6, 4),
    ('Lara', 'Croft', 4, 7),
    ('Ellen', 'Ripley', 6, 4);