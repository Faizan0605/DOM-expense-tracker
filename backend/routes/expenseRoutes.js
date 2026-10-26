const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/add', expenseController.addExpense);
router.get('/', expenseController.getExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
