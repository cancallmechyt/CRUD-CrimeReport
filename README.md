const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const saltRounds = 10;
const jsonParser = bodyParser.json();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

// Create new user
app.post('/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.query(
      'INSERT INTO users (fname, lname, email, username, password, avatar) VALUES (?, ?, ?, ?, ?, ?)',
      [req.body.fname, req.body.lname, req.body.email, req.body.username, hash, req.body.avatar],
      function (err, results, fields) {
        if (err) {
          res.status(500).json({ status: 'error', message: err.message });
          return;
        }
        res.status(201).json({ status: 'success', message: 'User created successfully' });
      }
    );
  });
});

// Read user information
app.get('/users/:id', function (req, res, next) {
  const userId = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', [userId], function (err, results, fields) {
    if (err) {
      res.status(500).json({ status: 'error', message: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }
    res.status(200).json({ status: 'success', user: results[0] });
  });
});

// Update user information
app.put('/users/:id', jsonParser, function (req, res, next) {
  const userId = req.params.id;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.query(
      'UPDATE users SET fname = ?, lname = ?, email = ?, username = ?, password = ?, avatar = ? WHERE id = ?',
      [req.body.fname, req.body.lname, req.body.email, req.body.username, hash, req.body.avatar, userId],
      function (err, results, fields) {
        if (err) {
          res.status(500).json({ status: 'error', message: err.message });
          return;
        }
        res.status(200).json({ status: 'success', message: 'User updated successfully' });
      }
    );
  });
});

// Delete user
app.delete('/users/:id', function (req, res, next) {
  const userId = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', [userId], function (err, results, fields) {
    if (err) {
      res.status(500).json({ status: 'error', message: err.message });
      return;
    }
    res.status(200).json({ status: 'success', message: 'User deleted successfully
