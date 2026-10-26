const API_URL = 'http://localhost:3000/expenses';
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const submitButton = expenseForm.querySelector('button[type="submit"]');
const statusMessage = document.createElement('p');
statusMessage.setAttribute('role', 'status');
expenseForm.after(statusMessage);

let editingExpenseId = null;

expenseForm.addEventListener('submit', handleFormSubmit);
loadExpenses();

async function loadExpenses() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not load expenses.');
        renderExpenses(result.expenses);
    } catch (error) {
        showMessage(`${error.message} Make sure the backend is running on port 3000.`);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const expense = {
        expenseAmount: Number(expenseForm.elements.expenseAmount.value),
        description: expenseForm.elements.description.value.trim(),
        category: expenseForm.elements.category.value
    };

    if (!Number.isFinite(expense.expenseAmount) || expense.expenseAmount <= 0 || !expense.description) {
        showMessage('Enter an amount greater than zero and a description.');
        return;
    }

    const isEditing = editingExpenseId !== null;
    const url = isEditing ? `${API_URL}/${encodeURIComponent(editingExpenseId)}` : `${API_URL}/add`;
    const method = isEditing ? 'PUT' : 'POST';
    submitButton.disabled = true;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not save expense.');

        resetForm();
        await loadExpenses();
        showMessage(isEditing ? 'Expense updated.' : 'Expense added.');
    } catch (error) {
        showMessage(error.message);
    } finally {
        submitButton.disabled = false;
    }
}

function renderExpenses(expenses) {
    expenseList.replaceChildren();
    expenses.forEach((expense) => {
        const item = document.createElement('li');
        item.append(document.createTextNode(`${expense.expenseAmount} - ${expense.category} - ${expense.description} `));

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => startEditing(expense));

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(expense.id, deleteButton));

        item.append(editButton, deleteButton);
        expenseList.append(item);
    });
}

function startEditing(expense) {
    editingExpenseId = expense.id;
    expenseForm.elements.expenseAmount.value = expense.expenseAmount;
    expenseForm.elements.description.value = expense.description;
    expenseForm.elements.category.value = expense.category;
    submitButton.textContent = 'Save Changes';
    showMessage(`Editing expense #${expense.id}.`);
    expenseForm.elements.expenseAmount.focus();
}

async function deleteExpense(id, button) {
    button.disabled = true;
    try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not delete expense.');
        if (editingExpenseId === id) resetForm();
        await loadExpenses();
        showMessage('Expense deleted.');
    } catch (error) {
        showMessage(error.message);
        button.disabled = false;
    }
}

function resetForm() {
    expenseForm.reset();
    editingExpenseId = null;
    submitButton.textContent = 'Add Expense';
}

function showMessage(message) {
    statusMessage.textContent = message;
}
