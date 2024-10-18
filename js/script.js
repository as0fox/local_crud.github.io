// Function to display data from local storage
function displayData() {
    let dataTable = document.getElementById('dataTable');
    let storedData = JSON.parse(localStorage.getItem('users')) || [];
    
    dataTable.innerHTML = '';

    storedData.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>
                <button class="edit" onclick="editData(${index})">Edit</button>
                <button class="delete" onclick="deleteData(${index})">Delete</button>
            </td>
        </tr>`;
        dataTable.innerHTML += row;
    });
}

// Function to add data to local storage
function addData() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    if (name && email) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        users.push({ name, email });
        localStorage.setItem('users', JSON.stringify(users));

        displayData();
        clearInputs();
    } else {
        alert('Please enter both name and email.');
    }
}

// Function to edit data from local storage
function editData(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    document.getElementById('name').value = users[index].name;
    document.getElementById('email').value = users[index].email;

    // Update data after editing
    document.querySelector('button[onclick="addData()"]').innerHTML = 'Update';
    document.querySelector('button[onclick="addData()"]').onclick = () => updateData(index);
}

// Function to update data in local storage
function updateData(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users[index].name = document.getElementById('name').value;
    users[index].email = document.getElementById('email').value;

    localStorage.setItem('users', JSON.stringify(users));
    
    displayData();
    clearInputs();
    
    document.querySelector('button[onclick="updateData()"]').innerHTML = 'Add';
    document.querySelector('button[onclick="updateData()"]').onclick = () => addData();
}

// Function to delete data from local storage
function deleteData(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));

    displayData();
}

// Function to clear the input fields
function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

// Initialize table with data on page load
displayData();
