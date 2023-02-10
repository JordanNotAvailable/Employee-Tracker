INSERT INTO department(name)
VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Quality Control'),
('Office Management'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('Regional Manager', 100000, 1),
('Sales Rep', 67000, 2),
('HR Rep', 72000, 3),
('Warehouse Worker', 45000, 4),
('Quality Control' 60000, 5),
('Receptionist', 47000, 6),
('Accountant', 89000, 7);

INSERT INTO employee (first_name, last_name, role_id) 
VALUES
('Michael', 'Scott', 1),
('Pam', 'Beesly', 6),
('Jim', 'Halpert', 2),
('Toby', 'Flenderson', 3),
('Creed', 'Bratton', 5),
('Oscar', 'Martinez', 7),
('Darryl', 'Philbin', 4);

UPDATE `employee_db`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');
