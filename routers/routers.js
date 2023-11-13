const express = require('express');
const router = express.Router();

const userRoutes = require('./userrouter');
const todoRoutes = require('./todorouter');


// router.use('/users', userRoutes);
router.use('/user',userRoutes);
router.use('/todo',todoRoutes);






module.exports = router;
