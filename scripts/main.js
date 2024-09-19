const myLibrary = [];

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
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
    newDiv.id = myLibrary.length;
    const newList = document.createElement("ul");
    newDiv.appendChild(newList);

    for (let i = 0; i < 4; i++) {
        const newLi = document.createElement("li");
        switch (i) {
            case 0:
                newLi.innerHTML = `Title: ${book.name}`;
                break;
            case 1:
                newLi.innerHTML = `Author: ${book.author}`;
                break;
            case 2:
                newLi.innerHTML = `Pages: ${book.pages}`;
                break;
            case 3:
                newLi.innerHTML = `Status: ${book.status}`;
                break;
        }
        newList.appendChild(newLi);
    }

    const statusButton = document.createElement("button");
    statusButton.id = `${myLibrary.length}-status-btn`;
    newList.appendChild(statusButton);
    statusButton.innerHTML = `<button type=button onclick="changeStatus(this.parentElement)">Change Status</button>`

    const delButton = document.createElement("button");
    delButton.id = `${myLibrary.length}-btn`;
    newDiv.appendChild(delButton);
    delButton.innerHTML = `<button type=button onclick="deleteDiv(this.parentElement)">Delete</button>`

    document.getElementById("grid-container").appendChild(newDiv);

    // const liName = document.createElement("li");
    // liName.innerHTML = `Title: ${book.name}`;
    // newList.appendChild(liName);
    // newDiv.appendChild(document.createTextNode(book.name));
    // document.querySelector("#bookTable tbody").innerHTML = myLibrary.map(book => `<tr><td>${book.name}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.status}</td></tr>`).join('');
}

function deleteDiv(element) {
    const bookId = document.getElementById(element);
    myLibrary.pop(myLibrary[bookId]);
    element.parentNode.remove();
}

function changeStatus(element) {

}

// document.querySelector("#bookTable tbody").innerHTML = myLibrary.map(name => `<tr><td>${book2.name}</td><td>${book2.author}</td><td>${book2.pages}</td><td>${book2.status}</td></tr>`).join('');