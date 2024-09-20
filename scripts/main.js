const myLibrary = [];
let bookCounter = 0;  // Unique counter for each book

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = bookCounter++;  // Unique ID for each book
}

var myForm = document.forms.myForm;

function openForm() {
    document.getElementById("bookForm").style.display = "block";
    document.getElementById("open-button").style.display = "none";
}

function closeForm() {
    document.getElementById("bookForm").style.display = "none";
    document.getElementById("open-button").style.display = "block";
}

const book1 = new Book("Harry Potter", "J.K. Rowling", "300", "read");
const book2 = new Book("Card Captor Sakura", "CLAMP", "50", "reading");

addBookToLibrary(book1);
addBookToLibrary(book2);

myForm.onsubmit = function () {
    const book = new Book(myForm.name.value, myForm.author.value, myForm.pages.value, myForm.status.value);
    document.getElementById("bookForm").style.display = "none";
    document.getElementById("open-button").style.display = "block";
    addBookToLibrary(book);
    return false;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    const newDiv = document.createElement("div");
    newDiv.id = `book-${book.id}`;  // Use unique book ID
    const newList = document.createElement("ul");
    newDiv.appendChild(newList);

    for (let i = 0; i < 4; i++) {
        const newLi = document.createElement("li");
        switch (i) {
            case 0:
                newLi.innerHTML = `Title: ${book.name}`;
                newLi.id = `book-${book.id}-title`;
                break;
            case 1:
                newLi.innerHTML = `Author: ${book.author}`;
                newLi.id = `book-${book.id}-author`;
                break;
            case 2:
                newLi.innerHTML = `Pages: ${book.pages}`;
                newLi.id = `book-${book.id}-pages`;
                break;
            case 3:
                newLi.innerHTML = `Status: ${book.status} <button type="button" id="status-btn" onclick="changeStatus(${book.id})">Change status</button>`;
                newLi.id = `book-${book.id}-status`;
                break;
        }
        newList.appendChild(newLi);
    }

    const delButton = document.createElement("button");
    delButton.id = `book-${book.id}-btn`;
    newDiv.appendChild(delButton);
    delButton.textContent = "Delete";
    delButton.onclick = function () {
        deleteDiv(book.id);
    }

    document.getElementById("grid-container").appendChild(newDiv);
}

function deleteDiv(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);  // Find book by unique ID
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);  // Remove the book from array
        document.getElementById(`book-${bookId}`).remove();  // Remove the corresponding div
    }
}

function changeStatus(bookId) {
    const statusField = document.getElementById(`book-${bookId}-status`);
    statusField.innerHTML = `
        Status: 
        <select id="status-select-${bookId}" required>  
            <option value="read">read</option>
            <option value="reading">reading</option>
            <option value="on-hold">on-hold</option>
            <option value="dropped">dropped</option>
            <option value="plan to read">plan to read</option>
        </select>
        <button type="button" id="btn-status-submit" onclick="changeStatusValue(${bookId})">Ok</button>
    `;
}

function changeStatusValue(bookId) {
    const statusSelect = document.getElementById(`status-select-${bookId}`);
    const selectedStatus = statusSelect.value;
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);  // Find book by ID

    if (bookIndex !== -1) {
        myLibrary[bookIndex].status = selectedStatus;  // Update book status in array

        // Update the UI to show the new status
        const statusField = document.getElementById(`book-${bookId}-status`);
        statusField.innerHTML = `Status: ${selectedStatus} <button type="button" id="status-btn" onclick="changeStatus(${bookId})">Change status</button>`;
    }
}
