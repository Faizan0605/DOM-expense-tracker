const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    try {
        const { expenseAmount, description, category } = req.body;
        const newExpense = await Expense.create({
            expenseAmount,
            description,
            category
        });
        res.status(201).json({ success: true, expense: newExpense });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({ success: true, expenses });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { expenseAmount, description, category } = req.body;
        const expense = await Expense.findByPk(req.params.id);

        if (!expense) {
            return res.status(404).json({ success: false, error: 'Expense not found' });
        }

        await expense.update({ expenseAmount, description, category });
        res.status(200).json({ success: true, expense });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);

        if (!expense) {
            return res.status(404).json({ success: false, error: 'Expense not found' });
        }

        await expense.destroy();
        res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
