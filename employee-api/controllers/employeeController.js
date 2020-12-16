const express = require("express");
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { employee } = require("../models/employee");

// retrieve all employees
// url - localhost:3000/employees/
router.get('/', (req, res) => {
    employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error retriving employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

// retrieve employee by id
// url - localhost:3000/employees/<some id>
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with id : ${req.params.id}`);

    employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("Failed to retrieve employee : " + JSON.stringify(err, undefined, 2)); }
    });
});

// insert an employee record
// url - localhost:3000/employees/  
// post json data of new employee
router.post('/', (req, res) => {
    var emp = new employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("Failed to insert employee details:" + JSON.stringify(err, undefined, 2)); }
    });
});

// update an employee record by id
// url - localhost:3000/employees/<some id>
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("Failed to update employee deatils:" + JSON.stringify(err, undefined, 2)); }
    });
});

// delete an employee record by id
// url - localhost:3000/employees/<some id>
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("Failed to Delete employee record :" + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;