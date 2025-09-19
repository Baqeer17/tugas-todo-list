const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');
const deleteAllBtn = document.getElementById('delete-all-btn');
const filterBtn = document.getElementById('filter-btn');
let currentFilter = 'all';

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    const dueDate = dateInput.value;
    if (todoText === '') {
        alert('Todo text cannot be empty!');
        return;
    }
    if (emptyMessage) {
        emptyMessage.style.display = 'none';
    }
    const newTodoRow = document.createElement('tr');
    newTodoRow.innerHTML = `
    <td>${todoText}</td>
    <td>${dueDate || 'No Due Date'}</td>
    <td><button class="status-btn">Pending</button></td>
    <td><button class="delete-btn">Delete</button></td>
    `;
    todoList.appendChild(newTodoRow);
    todoInput.value = '';
    dateInput.value = '';
});
todoList.addEventListener('click', function(event) {
    const target = event.target; 
    if (target.classList.contains('delete-btn')) {
        const rowToDelete = target.closest('tr');
        rowToDelete.remove();
    }
    else if (target.classList.contains('status-btn')) {
        const rowToUpdate = target.closest('tr');
        rowToUpdate.classList.toggle('completed'); 
        if (rowToUpdate.classList.contains('completed')) {
            target.textContent = 'Completed';
            target.style.backgroundColor = '#A5D6A7'; 
        } else {
            target.textContent = 'Pending';
            target.style.backgroundColor = '#81D4FA'; 
        }
    }
    if (todoList.children.length === 0) {
        emptyMessage.style.display = 'table-row';
    }
});

deleteAllBtn.addEventListener('click', function() {
    const isConfirmed = confirm('Are you sure you want to delete all tasks?');
    if (isConfirmed) {
        todoList.innerHTML = '';
        emptyMessage.style.display = 'table-row';
    }
});
filterBtn.addEventListener('click', function() {
    if (currentFilter === 'all') {
        currentFilter = 'completed';
        filterBtn.textContent = 'Show: Completed';
    } else if (currentFilter === 'completed') {
        currentFilter = 'pending';
        filterBtn.textContent = 'Show: Pending';
    } else {
        currentFilter = 'all';
        filterBtn.textContent = 'Show: All';
    }
    applyFilter();
});

function applyFilter() {
    const allRows = todoList.querySelectorAll('tr'); 

    allRows.forEach(row => {
        const isCompleted = row.classList.contains('completed');
        
        switch (currentFilter) {
            case 'completed':
                row.style.display = isCompleted ? 'table-row' : 'none';
                break;
            case 'pending':
                row.style.display = !isCompleted ? 'table-row' : 'none';
                break;
            default: 
                row.style.display = 'table-row';
                break;
        }
    });
}