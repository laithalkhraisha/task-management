const express = require('express');
const router = express.Router();
const yourController = require('../controllers/usercontroller');

// CRUD routes
router.post('/add', yourController.create);
router.get('/get', yourController.read);
router.put('/update', yourController.update);
router.delete('/delete', yourController.delete);
router.post('/login', yourController.login);

module.exports = router;
