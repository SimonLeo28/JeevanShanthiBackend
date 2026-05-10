const express = require('express');
const { getPlans, getPlanById, seedPlans } = require('../controllers/planController');

const router = express.Router();

router.get('/', getPlans);
router.post('/seed', seedPlans);
router.get('/:planId', getPlanById);

module.exports = router;
