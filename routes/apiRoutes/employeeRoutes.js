const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, department.name 
    AS party_name 
    FROM employees 
    LEFT JOIN department 
    ON employee.department_id = department.id`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single employee
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT team.*, department.name 
    AS department_name 
    FROM team 
    LEFT JOIN department 
    ON team.department = department.id 
    WHERE team.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// DELETE an employee
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM team WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusManager(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// CREATE an employee
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'department_id', 'role_id', 'manager');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO team (first_name, last_name, department_id, role_id, manager)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.department, body.role, body.manager];

    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
    message: 'success',
    data: body
  });
});
});

// Update an employee's role
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE teams SET role_id = ? 
               WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
        } else if (!result.affectedRows) {
        res.json({
            message: 'Employee not found'
        });
        } else {
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
        }
    });
});

// Update an employee's department
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'department_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE teams SET department_id = ? 
               WHERE id = ?`;
    const params = [req.body.department_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
        } else if (!result.affectedRows) {
        res.json({
            message: 'Employee not found'
        });
        } else {
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
        }
    });
});

// Update an employee's manager
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'manager');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE team SET manager = ? 
               WHERE id = ?`;
    const params = [req.body.manager, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
        } else if (!result.affectedRows) {
        res.json({
            message: 'Employee not found'
        });
        } else {
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
        }
    });
});


module.exports = router;