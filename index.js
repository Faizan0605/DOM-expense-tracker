function handleFormSubmit(event) {
    event.preventDefault();

    const formElement = event.target;

    const expenseAmount = formElement.expenseAmount.value;
    const description = formElement.description.value;
    const category = formElement.category.value;


    const newExpense = {
        expenseAmount,
        description,
        category
    }

    const id = Date.now();
    localStorage.setItem(id, JSON.stringify(newExpense));

    console.log("New Expense Submitted:", newExpense);


    const newLi = document.createElement('li');
    const ul = document.getElementById("expenseList")

    newLi.textContent = `${expenseAmount}-${category}-${description} `;
    newLi.id = id;

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete Expense";
    delBtn.addEventListener('click', () => {

        delBtn.parentElement.remove();
        localStorage.removeItem(newLi.id);

    })

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit Expense";
    editBtn.addEventListener('click', () => {
        const parentLi = editBtn.parentElement;
        console.log(parentLi);
    })

    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);
    ul.appendChild(newLi);
}

function getAllElement() {
    const allExpense = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const rawValue = localStorage.getItem(key);
        const parsedValue = JSON.parse(rawValue);

        allExpense.push({ id: key, data: parsedValue });
    }

    return allExpense;
}


const allExpense = getAllElement();
for (let i = 0; i < allExpense.length; i++) {

    const newLi = document.createElement('li');
    const ul = document.getElementById("expenseList")

    const expenseAmount = allExpense[i].data.expenseAmount;
    const category = allExpense[i].data.category;
    const description = allExpense[i].data.description;
    const id = allExpense[i].id;

    newLi.textContent = `${expenseAmount}-${category}-${description} `;
    newLi.id = id;

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete Expense";
    delBtn.addEventListener('click', () => {
        delBtn.parentElement.remove();
        localStorage.removeItem(newLi.id);
    })

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit Expense";
    editBtn.addEventListener('click', () => {
        const parentLi = editBtn.parentElement;
        const editId = parentLi.id;
        edit(editId);

    })

    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);

    ul.appendChild(newLi);
}


function clearData() {
    localStorage.clear();
    document.getElementById("expenseList").innerHTML = '';
}


function edit(editId) {
    const rawData = localStorage.getItem(editId);
    const editData = JSON.parse(rawData);
    console.log(editData);

    const editAmountInput = document.createElement('input');
    const editCategoryInput = document.createElement('select');
    const editDescriptionInput = document.createElement('input');

    editAmountInput.type = 'number';
    editAmountInput.name = 'expenseAmount';

    editDescriptionInput.type = 'text';
    editDescriptionInput.name = 'description';

    editCategoryInput.name = 'category';
    const options = ["Movie", "Fuel", "Food", "Vacation"];
    options.forEach(opt => {
        const optionElement = document.createElement('option');
        optionElement.value = opt;
        optionElement.textContent = opt;
        editCategoryInput.appendChild(optionElement);
    });

    editAmountInput.value = editData.expenseAmount;
    editDescriptionInput.value = editData.description;
    editCategoryInput.value = editData.category;

    const editSubmit = document.createElement('button');
    editSubmit.textContent = 'Edit Submit';
    editSubmit.type = 'submit'


    const form = document.createElement('form');
    form.append(editAmountInput);
    form.append(editCategoryInput);
    form.append(editDescriptionInput);
    form.append(editSubmit);
    form.addEventListener('submit', (event) => handleEditSubmit(event, editId));

    const parentDiv = document.querySelector('.parent');
    parentDiv.append(form);
}


function handleEditSubmit(event, editId) {
    event.preventDefault();

    const formElement = event.target;

    const expenseAmount = formElement.expenseAmount.value;
    const description = formElement.description.value;
    const category = formElement.category.value;


    const newExpense = {
        expenseAmount,
        description,
        category
    }

    const id = editId;
    localStorage.setItem(id, JSON.stringify(newExpense));

    console.log("New Expense Submitted:", newExpense);

    const oldLi = document.getElementById(id);
    if (oldLi) {
        oldLi.remove();
    }

    const newLi = document.createElement('li');
    const ul = document.getElementById("expenseList")

    newLi.textContent = `${expenseAmount}-${category}-${description} `;
    newLi.id = id;

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete Expense";
    delBtn.addEventListener('click', () => {

        delBtn.parentElement.remove();
        localStorage.removeItem(newLi.id);

    })

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit Expense";
    editBtn.addEventListener('click', () => {
        edit(newLi.id);
    })


    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);
    ul.appendChild(newLi);
    formElement.remove();
}