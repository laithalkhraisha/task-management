const express = require('express');
const router = express.Router();
const yourController = require('../controllers/todocontroller');




router.post('/add', yourController.createTask);
router.get('/get', yourController.getAllTasks);
router.put('/update', yourController.updateTaskById);
router.put('/delete', yourController.deleteTaskById);
router.put('/completed', yourController.completTask);
router.post('/getid', yourController.getTaskById);

module.exports = router;
