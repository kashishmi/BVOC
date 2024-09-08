document.getElementById('createForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});

function getUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                usersList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;

    fetch(`/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});

document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const id = document.getElementById('deleteId').value;

    fetch(`/users/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});