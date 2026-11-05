document.addEventListener('DOMContentLoaded', () => {
  // grabing the html elements
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const list = document.getElementById('todo-list');
  const counter = document.getElementById('counter');

  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  // fucntion to upadte the counter and filters
  function updateUI() {
    const items = list.querySelectorAll('li');
    let activeCount = 0;

    items.forEach(item => {
      if (!item.classList.contains('completed')) {
        activeCount++;
      }
    });

    counter.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

    // aplying the filters
    items.forEach(item => {
      const isCompleted = item.classList.contains('completed');

      if (currentFilter === 'all') {
        item.style.display = '';
      } else if (currentFilter === 'active') {
        item.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        item.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  // add new item when form is submited
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'todo-text';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = '';
    updateUI();
  });

  // event delgation for clicks on the list
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('li').remove();
      updateUI();
      return;
    }

    if (e.target.classList.contains('todo-text')) {
      e.target.closest('li').classList.toggle('completed');
      updateUI();
    }
  });

  // filter buttons lisnteners
  filterAll.addEventListener('click', () => { currentFilter = 'all'; updateUI(); });
  filterActive.addEventListener('click', () => { currentFilter = 'active'; updateUI(); });
  filterDone.addEventListener('click', () => { currentFilter = 'done'; updateUI(); });
  // hide error msg when they start typing again
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      errorMsg.classList.add('hidden');
    }
  });
});