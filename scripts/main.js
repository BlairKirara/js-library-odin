const myLibrary = [];

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

var myForm = document.forms.myForm;
var statusForm = document.forms.statusForm;

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
    newDiv.id = myLibrary.length - 1;
    const newList = document.createElement("ul");
    newDiv.appendChild(newList);

    for (let i = 0; i < 4; i++) {
        const newLi = document.createElement("li");
        switch (i) {
            case 0:
                newLi.innerHTML = `Title: ${book.name}`;
                newLi.id = `${myLibrary.length - 1}-title`;
                break;
            case 1:
                newLi.innerHTML = `Author: ${book.author}`;
                newLi.id = `${myLibrary.length - 1}-author`;
                break;
            case 2:
                newLi.innerHTML = `Pages: ${book.pages}`;
                newLi.id = `${myLibrary.length - 1}-pages`;
                break;
            case 3:
                newLi.innerHTML = `Status: ${book.status} <button type="button" id="status-btn" onclick="changeStatus(this.parentElement.id)">Change status</button>`;
                newLi.id = `${myLibrary.length - 1}-status`;
                break;
        }
        newList.appendChild(newLi);
    }

    const delButton = document.createElement("button");
    delButton.id = `${myLibrary.length}-btn`;
    newDiv.appendChild(delButton);
    delButton.textContent = "Delete";
    delButton.onclick = function () {
        deleteDiv(this);
    }
    // delButton.innerHTML = `<button type=button onclick="deleteDiv(this.parentElement)">Delete</button>`

    document.getElementById("grid-container").appendChild(newDiv);


}

function deleteDiv(element) {
    const bookId = document.getElementById(element);
    myLibrary.pop(myLibrary[bookId]);
    element.parentNode.remove();
}

function changeStatus(element) {
    console.log(element);
    document.getElementById(element).innerHTML = `Status: 
    <select id="status-select" required>  
        <option value="read">read</option>
        <option value="reading">reading</option>
        <option value="on-hold">on-hold</option>
       <option value="dropped">dropped</option>
       <option value="plan to read">plan to read</option>
    </select>
    <button type="button" id="btn-status-submit" onclick="changeStatusValue(this.parentElement.id, this.parentElement.parentElement.parentElement.id)">Ok</button>`
}

function changeStatusValue(fieldId, bookId) {
    const statusSelect = document.getElementById('status-select');

    const selectedStatus = statusSelect.value;
    console.log(selectedStatus);

    myLibrary[bookId].status = selectedStatus;

    document.getElementById(fieldId).innerHTML = `Status: ${myLibrary[bookId].status} <button type="button" id="status-btn" onclick="changeStatus(this.parentElement.id)">Change status</button>`

}

// function changeStatus(element) {
//     // const bookId = element.parentNode.id;
//     // document.getElementById(`${bookId}-status`).innerHTML =
//     //     `<form action="#" id="myStatusForm" name="myStatusForm">
//     //     <label for="status">Status: </label>
//     //     <select id="status" required>
//     //         <option value="">--Please choose status--</option>
//     //         <option value="read">read</option>
//     //         <option value="reading">reading</option>
//     //         <option value="on-hold">on-hold</option>
//     //         <option value="dropped">dropped</option>
//     //         <option value="plan to read">plan to read</option>
//     //     </select>
//     //     <button type="submit" id="btn-status-submit">Ok</button>
//     //     </form>`
//     // document.body.append()
// }

// myStatusForm.onsubmit = function () {
//     document.getElementById(myStatusForm.parentNode.id).value = myStatusForm.status.value;
//     return false;
// }

// document.querySelector("#bookTable tbody").innerHTML = myLibrary.map(name => `<tr><td>${book2.name}</td><td>${book2.author}</td><td>${book2.pages}</td><td>${book2.status}</td></tr>`).join('');